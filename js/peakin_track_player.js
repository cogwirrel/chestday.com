function PeakinTrackPlayer() {

	// Initialise soundcloud api
	SC.initialize({
		client_id: '8eaeb95d4bf84d06f0001a18f55695a2'
	});

	this.playing = false;

	// Number of tracks we've played since we last rocked out!
	this.trackCount = 0;
	// Number of tracks we've skipped since we last rocked out!
	this.skipCount = 0;
	// Number of tracks fully listened to before we engage the rock out!
	this.ROCKOUTNUMBER = 5;
	// Delay before rocking out after ROCKOUTNUMBER tracks
	this.rockOutDelay = 60000;

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
		animation: true,
		template: '<div class="popover jigglable"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
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

	this.trackCount++;

	if(this.trackCount - this.skipCount == this.ROCKOUTNUMBER)
	{
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
}

PeakinTrackPlayer.prototype.skip = function() {
	this.skipCount++;
	this.switchTracks();
}

PeakinTrackPlayer.prototype.rockOut = function() {
	console.log("Rocking out in 1 minute!");
	this.rockOutTimeOut = window.setTimeout(function() {
		$('.jigglable').addClass('jiggle');
	}, this.rockOutDelay);
}

PeakinTrackPlayer.prototype.stopRockOut = function() {
	$('.jigglable').removeClass('jiggle');
	window.clearTimeout(this.rockOutTimeOut);
	this.trackCount = 0;
	this.skipCount = 0;
}

// Return a random soundcloud track id
PeakinTrackPlayer.prototype.gimmeAPeakinTrack = function() {
	return randomElement([
		"42663926", // Porter Robinson - Language
		"4159541", // Survivor - Eye of the Tiger
		"53045153", // Madeon - Finale
		"108140964", // Katy Perry - Roar
		"106483833", // Sub Focus - Tidal Wave
		"54833549", // Alesso - Years
		"44509875", // Rudimental - Feel the Love
		"97617992", // Avicii - Wake me up
		"63726365", // Overwerk - Daybreak
		"40781265", // Savant - Living iPod
		"45784550", // Savant - Splinter
		"13719168", // Shogun - Skyfire
		"31027910", // Michael Calfan - Resurrection
		"23142795", // Avicii - Levels
		"44820594", // Nadia Ali - Believe it
		"37492984" // DJ KUBA & NE!TAN - Take it to the Top
		// "77471974", // 2-second test track
		// "65555191" // 10-second test track
	]);
}