function PeakinTrackPlayer() {

	// Initialise soundcloud api
	SC.initialize({
		client_id: '8eaeb95d4bf84d06f0001a18f55695a2'
	});

	this.playing = false;

	// I hate javascript
	var that = this;

	// Pre-cache current track
	SC.stream("/tracks/" + this.gimmeAPeakinTrack(), function(sound) {
		that.currentTrack = sound;
	});

	// Pre-cache next track
	SC.stream("/tracks/" + this.gimmeAPeakinTrack(), function(sound) {
		that.nextTrack = sound;
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

	this.playCurrentTrack();

	var that = this;

	// Pre-cache next track
	SC.stream("/tracks/" + this.gimmeAPeakinTrack(), function(nextSound) {
		that.nextTrack = nextSound;
	});
}

PeakinTrackPlayer.prototype.playCurrentTrack = function() {
	var that = this;
	this.currentTrack.play({
		'onfinish': function() {that.switchTracks();}
	});
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