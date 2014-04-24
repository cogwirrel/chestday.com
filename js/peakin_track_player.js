function PeakinTrackPlayer(id, tracks) {

	var peakinTrackIcon = "<a href=\"javascript:void(0);\" id=\"headphone-button\"><i class=\"fa fa-headphones\"></i></a>";
	$('#' + id).html(peakinTrackIcon);

	// Initialise soundcloud api
	SC.initialize({
		client_id: '8eaeb95d4bf84d06f0001a18f55695a2'
	});

	// Provided list of soundcloud ids
	this.trackManager = new PeakinTrackManager(tracks);
	this.trackManager.shuffle();

	this.playing = false;

	this.peakinTracks = [];

	// I hate javascript
	var that = this;

	this.trackMetadata = {};
	this.nextTrackMetadata = {};

	// Pre-cache current track
	this.cacheTrack(this.trackManager.next(), function(track, metadata) {
		that.currentTrack = track;
		that.trackMetadata = metadata;
	});

	var nexticon = "<i class=\"fa fa-chevron-right\"></i>";
	var previcon = "<i class=\"fa fa-chevron-left\"></i>";

	var soundcloudlogo = "<div id=\"soundcloud-logo\" class=\"chest-centre\"><a href=\"http://www.soundcloud.com/\"><img src=\"/img/soundcloud.png\"></img></a></div>";
	var next = "<div id=\"peakin-next\" class=\"peakin-skip\"><a id=\"peakin-skip-button\" onclick=\"peakinTrackPlayer.next();\" href=\"javascript:void(0);\">"+nexticon+"</a></div>";
	var prev = "<div id=\"peakin-prev\" class=\"peakin-skip\"><a id=\"peakin-skip-button\" onclick=\"peakinTrackPlayer.prev();\" href=\"javascript:void(0);\">"+previcon+"</a></div>";
	var content = "<div class=\"peakin-popover-content\">" + "You're more amped than this player can handle! Try clicking again." + "</div>";
	var skipDrop = "<div class=\"peakin-popover-footer well well-small\" id=\"peakin-skiptodrop\">\
						<a id=\"peakin-skiptodrop-button\" onclick=\"peakinTrackPlayer.skipToDrop();\" href=\"javascript:void(0);\" rel=\"tooltip\" data-original-title=\"Skip to drop\">\
							<strong>" + nexticon + nexticon + " <span id=\"skiptodrop-text\">!</span></strong>\
						</a>\
					</div>";
	$('#headphone-button').popover({
		placement : 'bottom',
		title: "<div class=\"peakin-popover-title\">" + prev + next + soundcloudlogo + "</div>",
		content: content,
		html: true,
		animation: true,
		template: '<div class="popover jigglable"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div>' + skipDrop + '</div>'
	});

	$('#headphone-button').click(function(event) {
		peakinTrackPlayer.togglePlay();
	});
};

PeakinTrackPlayer.prototype.cacheTrack = function(trackId, callback) {
	var metadata = {};
	var track = {};

	// Pre-cache current track
	SC.stream("/tracks/" + trackId, function(sound) {
		track = sound;
		SC.get("/tracks/" + trackId, function(data) {
			metadata.artist = data.user.username;
			metadata.title = data.title;
			metadata.url = data.permalink_url;
			metadata.artisturl = data.user.permalink_url;
			metadata.track = data;
			metadata.id = trackId;

			callback(track, metadata);
		});
	});
}

PeakinTrackPlayer.prototype.togglePlay = function() {

	if(this.playing) {
		// Stop the soundcloud player
		if(this.currentTrack) {
			this.currentTrack.pause();
		}

		// Stop the icon from wiggling
		$('#headphone-button i').removeClass('red jiggle');

		// Show the popover with track info
		$('#headphone-button').popover('hide');

		this.playing = false;
	} else {
		// Start playing the peakin track!
		if(this.currentTrack) {
			this.playCurrentTrack();
		}

		// Start wiggling
		$('#headphone-button i').addClass('red jiggle');

		// Hide the popover with track info
		$('#headphone-button').popover('show');

		this.playing = true;
	}
		
}

PeakinTrackPlayer.prototype.switchTracks = function(newTrackId) {

	// Stop the current track, stop streaming, then delete it
	this.currentTrack.stop();
	this.currentTrack.unload();
	delete this.currentTrack;

	var that = this;

	// Play the next track
	this.cacheTrack(newTrackId, function(track, metadata) {
		that.currentTrack = track;
		that.trackMetadata = metadata;
		that.playCurrentTrack();
	});
}

PeakinTrackPlayer.prototype.playCurrentTrack = function() {
	var that = this;
	this.currentTrack.play({
		'onfinish': function() {that.next();}
	});
	this.updateNowPlaying();
}

PeakinTrackPlayer.prototype.updateNowPlaying = function() {

	var track = "<a href=\"" + this.trackMetadata.url + "\">";
	track += this.trackMetadata.title;
	track += "</a>";

	var artist = "<a href=\"" + this.trackMetadata.artisturl + "\">";
	artist += this.trackMetadata.artist;
	artist += "</a>";

	var content = "<div class=\"peakin-popover-content\"><div><strong>" + artist + "</strong></div><div>" + track + "</div></div>";

	var popover = $('#headphone-button').data('popover');

	// Update the content to match the currently playing track
	// Change that persists, but does not update instantly
	popover.options.content = content;
	// Change that is temporary, but updates instantly
	popover.$tip.find('.popover-content').html(content);

	$('[rel=tooltip]').tooltip({html:true, placement:'bottom'});
}

PeakinTrackPlayer.prototype.next = function() {
	this.switchTracks(this.trackManager.next());
}

PeakinTrackPlayer.prototype.prev = function() {
	this.switchTracks(this.trackManager.prev());
}

PeakinTrackPlayer.prototype.beaker = function() {
	if(this.trackMetadata.id == "102313961") {
		// If it's Eat, Sleep, Rave, Repeat
		window.setTimeout(function() {
			var oldImage = $('#chest-img').attr('src');
			console.log(oldImage);
			setImage("img/beaker.gif");
			window.setTimeout(function() {
				setImage(oldImage);
			}, 16000);
		}, 4000);
	}
}

PeakinTrackPlayer.prototype.skipToDrop = function() {
	// Skip to the location where a drop has been detected
	var that = this;
	this.findDrop(this.trackMetadata, function(drop) {
		that.currentTrack.setPosition(drop);
		console.log("Skipped to " + drop + "ms");

		// Easter egg!
		that.beaker();
	});
}

PeakinTrackPlayer.prototype.findDrop = function(trackMetadata, callback) {
	// Create a Waveform, note that container isn't actually used as I modified waveform.js
	// - we don't care about displaying the waveform, we just want to find the drop!
	var wav = new Waveform({
		container: document.getElementById("waveform")
	});

	var that = this;

	// Request the waveform data from soundcloud servers
	wav.dataFromSoundCloudTrack(trackMetadata.track, function(waveform) {
		
		// Obtain the number of milliseconds each waveform entry accounts for in the track
		var millisPerWaveformChunk = trackMetadata.track.duration / waveform.data.length;

		var data = waveform.data;
		
		// The number of waveform chunks to look at at once
		var n = 20;

		// The difference required to count as a drop (between 0 and 1)
		var threshold = 0.08;

		// A difference less than this means levels are 'similar'
		var similarityThreshold = 0.03;

		// The index of the drop in the waveform data
		var drop = 0;

		// The index of the backup drop in the waveform data
		var backupDrop = 0;

		var foundBackupDrop = false;

		// We start from the position in the waveform corresponding to our current position (millis) in the track
		var startIndex = Math.ceil(that.currentTrack.position / millisPerWaveformChunk);

		// Loop through the waveform
		for(var i = startIndex; i < data.length - 3*n; i++) {
			// Obtain three chunks of length n from i and average the waveform values
			// Essentially we're downsampling here
			var prev = data.slice(i, i+n).average();
			var current = data.slice(i+n, i+2*n).average();
			var next = data.slice(i+2*n, i+3*n).average();

			// Find an 'up down up' drop
			if(that.isUpDownUpDrop(prev, current, next, threshold, similarityThreshold)) {
				drop = i;
				break;
			}

			// Find a 'down up' drop - less preferable
			if(that.isDownUpDrop(prev, current, threshold) && !foundBackupDrop) {
				backupDrop = i;
				foundBackupDrop = true;
			}
		}

		// If we haven't found an 'up down up' drop, use the 'down up' drop
		if(drop == 0) {
			drop = backupDrop;
		}

		// The position in the track corresponding to the index at which we found the drop
		var dropMilliseconds = millisPerWaveformChunk * drop;

		callback(dropMilliseconds);
	});
}

PeakinTrackPlayer.prototype.isUpDownUpDrop = function(prev, current, next, t, st) {
	return (next - current > t) && next > prev && (next - prev) < st;
}

PeakinTrackPlayer.prototype.isDownUpDrop = function(prev, current, t) {
	return (current - prev > t);
}