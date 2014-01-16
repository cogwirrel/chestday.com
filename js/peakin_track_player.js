function PeakinTrackPlayer(tracks) {

	// Initialise soundcloud api
	SC.initialize({
		client_id: '8eaeb95d4bf84d06f0001a18f55695a2'
	});

	// Provided list of soundcloud ids
	this.tracks = tracks;

	this.playing = false;

	// Number of tracks we've played since we last rocked out!
	this.trackCount = 0;
	// Number of tracks we've skipped since we last rocked out!
	this.skipCount = 0;
	// Number of tracks fully listened to before we engage the rock out!
	this.ROCKOUTNUMBER = 5;
	// Delay before rocking out after ROCKOUTNUMBER tracks
	this.rockOutDelay = 60000;
	this.isRockingOut = false;

	this.peakinTracks = [];

	// I hate javascript
	var that = this;

	this.trackMetadata = {};
	this.nextTrackMetadata = {};

	// Pre-cache current track
	this.cacheTrack(function(track, metadata) {
		that.currentTrack = track;
		that.trackMetadata = metadata;
	});

	// Pre-cache next track
	this.cacheTrack(function(track, metadata) {
		that.nextTrack = track;
		that.nextTrackMetadata = metadata;
	});

	var skipicon = "<i class=\"fa fa-chevron-right\"></i>";

	var soundcloudlogo = "<span id=\"soundcloud-logo\" class=\"chest-centre\"><a href=\"http://www.soundcloud.com/\"><img src=\"img/soundcloud.png\"></img></a></span>";
	var skip = "<span id=\"peakin-skip\"><a id=\"peakin-skip-button\" onclick=\"peakinTrackPlayer.skip();\" href=\"javascript:void(0);\">"+skipicon+"</a></span>";
	var content = "<div class=\"peakin-popover-content\">" + "You're more amped than this player can handle! Try clicking again." + "</div>";
	var skipDrop = "<div class=\"peakin-popover-content well well-small\" id=\"peakin-skiptodrop\">\
						<a id=\"peakin-skiptodrop-button\" onclick=\"peakinTrackPlayer.skipToDrop();\" href=\"javascript:void(0);\" rel=\"tooltip\" data-original-title=\"Skip to drop<br>[experimental]\">\
							<strong>" + skipicon + skipicon + " <span id=\"skiptodrop-text\">!</span></strong>\
						</a>\
					</div>";
	$('#headphone-button').popover({
		placement : 'bottom',
		title: "<div class=\"peakin-popover-title\">" + soundcloudlogo + skip + "</div>",
		content: content,
		html: true,
		animation: true,
		template: '<div class="popover jigglable"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div>' + skipDrop + '</div>'
	});
};

PeakinTrackPlayer.prototype.cacheTrack = function(callback) {
	var metadata = {};
	var trackId = this.gimmeAPeakinTrack();
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

		// Cancel any rocking out
		this.stopRockOut();

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

PeakinTrackPlayer.prototype.switchTracks = function() {

	if(this.isRockingOut) {
		this.stopRockOut();
	}

	this.trackCount++;

	if(this.trackCount - this.skipCount == this.ROCKOUTNUMBER) {
		this.rockOut();
	}

	// Stop the current track, stop streaming, then delete it
	this.currentTrack.stop();
	this.currentTrack.unload();
	delete this.currentTrack;

	// Set the current track to the next track
	this.currentTrack = this.nextTrack;
	this.trackMetadata = this.nextTrackMetadata;

	// Play the current track
	this.playCurrentTrack();

	var that = this;

	// Pre-cache next track
	this.cacheTrack(function(track, metadata) {
		that.nextTrack = track;
		that.nextTrackMetadata = metadata;
	});
}

PeakinTrackPlayer.prototype.playCurrentTrack = function() {
	var that = this;
	this.currentTrack.play({
		'onfinish': function() {that.switchTracks();}
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

PeakinTrackPlayer.prototype.skip = function() {
	this.skipCount++;
	this.switchTracks();
}

PeakinTrackPlayer.prototype.rockOut = function() {
	console.log("Rocking out in 1 minute!");
	var that = this;
	this.rockOutTimeOut = window.setTimeout(function() {
		that.rockOutNow();
	}, this.rockOutDelay);
}

PeakinTrackPlayer.prototype.rockOutNow = function() {
	this.isRockingOut = true;
	$('.jigglable').addClass('jiggle');
}

PeakinTrackPlayer.prototype.stopRockOut = function() {
	$('.jigglable').removeClass('jiggle');
	window.clearTimeout(this.rockOutTimeOut);
	this.trackCount = 0;
	this.skipCount = 0;
	this.isRockingOut = false;
}

// Return a random soundcloud track id
PeakinTrackPlayer.prototype.gimmeAPeakinTrack = function() {
	// Refresh our list if we've run out of tracks
	if(this.peakinTracks.length == 0) {
		this.peakinTracks = this.getPeakinTracks();
	}

	// Pick a random track
	var track = randomElement(this.peakinTracks);

	// Remove it so we don't get it again (until we've run out)
	var index = this.peakinTracks.indexOf(track);
	this.peakinTracks.splice(index, 1);

	return track;
}

PeakinTrackPlayer.prototype.getPeakinTracks = function() {
	// Return a clone of the tracks array
	return this.tracks.slice(0);
}

PeakinTrackPlayer.prototype.skipToDrop = function() {
	// Skip to the location where a drop has been detected
	var that = this;
	this.findDrop(this.trackMetadata, function(drop) {
		that.currentTrack.setPosition(drop);
		console.log("Skipped to " + drop + "ms");
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
			if(next - current > threshold && Math.abs(next - prev) < similarityThreshold) {
				drop = i;
				break;
			}

			// Find a 'down up' drop - less preferable
			if(current - prev > threshold && !foundBackupDrop) {
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