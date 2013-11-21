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
	SC.stream("/tracks/" + this.gimmeAPeakinTrack(), function(sound) {
		that.currentTrack = sound;
		SC.get("/tracks/" + that.gimmeAPeakinTrack(), function(data) {
			that.trackMetadata.artist = data.user.username;
			that.trackMetadata.title = data.title;
			that.trackMetadata.url = data.permalink_url;
		});
	});

	// Pre-cache next track
	SC.stream("/tracks/" + this.gimmeAPeakinTrack(), function(sound) {
		that.nextTrack = sound;
		SC.get("/tracks/" + that.gimmeAPeakinTrack(), function(data) {
			that.nextTrackMetadata.artist = data.user.username;
			that.nextTrackMetadata.title = data.title;
			that.nextTrackMetadata.url = data.permalink_url;
		});
	});
};

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

	this.currentTrack.stop();
	delete this.currentTrack;
	this.currentTrack = this.nextTrack;
	this.trackMetadata = this.nextTrackMetadata;

	this.playCurrentTrack();

	var that = this;

	// Pre-cache next track
	SC.stream("/tracks/" + this.gimmeAPeakinTrack(), function(nextSound) {
		that.nextTrack = nextSound;
		SC.get("/tracks/" + that.gimmeAPeakinTrack(), function(data) {
			that.nextTrackMetadata.artist = data.user.username;
			that.nextTrackMetadata.title = data.title;
			that.nextTrackMetadata.url = data.permalink_url;
		});
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

	console.log("update now playing...");

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