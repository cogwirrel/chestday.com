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

		this.playing = false;
	} else {
		// Start playing the peakin track!
		if(this.currentTrack) {
			this.playCurrentTrack();
		}

		// Start wiggling
		$('#headphone-button i').addClass('red jiggle');

		this.playing = true;
	}
		
}

PeakinTrackPlayer.prototype.switchTracks = function() {

	console.log("Switching track...");

	// Stop the current track just in case, then delete it
	this.currentTrack.stop();
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

	var nowPlaying = "";
	nowPlaying += "<a href=\"http://www.soundcloud.com/\"><img src=\"img/soundcloud.png\"></img></a>";
	nowPlaying += "<a href=\"" + this.trackMetadata.url + "\">";
	nowPlaying += this.trackMetadata.artist;
	nowPlaying += " - " + this.trackMetadata.title;
	nowPlaying += "</a>";

	$('#peakin-track-now-playing').html(nowPlaying);
}

// Return a random soundcloud track id
PeakinTrackPlayer.prototype.gimmeAPeakinTrack = function() {
	return randomElement([
		// "42663926", // Porter Robinson - Language
		// "4159541", // Survivor - Eye of the Tiger
		// "24975003", // Hardwell - Cobra
		// "108140964" // Katy Perry - Roar
		"77471974", // 2-second test track
		"65555191" // 10-second test track
	]);
}