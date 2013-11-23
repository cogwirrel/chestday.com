function PeakinTrackPlayer() {

	// Initialise soundcloud api
	SC.initialize({
		client_id: '8eaeb95d4bf84d06f0001a18f55695a2'
	});

	this.playing = false;

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

	var soundcloudlogo = "<span id=\"soundcloud-logo\" class=\"chest-centre\"><a href=\"http://www.soundcloud.com/\"><img src=\"img/soundcloud.png\"></img></a></span>";
	var skip = "<span id=\"peakin-skip\"><a id=\"peakin-skip-button\" onclick=\"peakinTrackPlayer.skip();\" href=\"javascript:void(0);\"><i class=\"fa fa-chevron-right\"></i></a></span>"
	var content = "<div class=\"peakin-popover-content\">" + "You're more amped than this player can handle! Try clicking again." + "</div>";
	$('#headphone-button').popover({
		placement : 'bottom',
		title: "<div class=\"peakin-popover-title\">" + soundcloudlogo + skip + "</div>",
		content: content,
		html: true,
		animation: false
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

PeakinTrackPlayer.prototype.switchTracks = function() {

	console.log("Switching track...");

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
}

PeakinTrackPlayer.prototype.skip = function() {
	this.switchTracks();
}

// Return a random soundcloud track id
PeakinTrackPlayer.prototype.gimmeAPeakinTrack = function() {
	return randomElement([
		"42663926", // Porter Robinson - Language
		"4159541", // Survivor - Eye of the Tiger
		"53045153", // Madeon - Finale
		"108140964" // Katy Perry - Roar
		// "77471974", // 2-second test track
		// "65555191" // 10-second test track
	]);
}