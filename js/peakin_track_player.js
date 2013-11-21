function PeakinTrackPlayer() {
	this.playerStart = "<div id=\"peakin-track-player\"><iframe width=\"0\" height=\"0\" scrolling=\"no\" frameborder=\"no\" src=\"https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/";
	this.playerEnd = "&amp;color=cc181e&amp;auto_play=true&amp;show_artwork=false\"></iframe></div>";
	this.playing = false;
};

PeakinTrackPlayer.prototype.togglePlay = function() {

	if(this.playing) {
		// Stop the soundcloud player by deleting it
		$('#peakin-track-player').remove();

		// Stop the icon from wiggling
		$('#headphone-button i').removeClass('red jiggle');

		this.playing = false;
	} else {
		// Start playing the peakin track!
		var trackId = this.gimmeAPeakinTrack();
		var player = this.playerStart + trackId + this.playerEnd;
		$('#peakin-track-container').append(player);

		// Start wiggling
		$('#headphone-button i').addClass('red jiggle');

		this.playing = true;
	}
		
}

// Return a random soundcloud track id
PeakinTrackPlayer.prototype.gimmeAPeakinTrack = function() {
	return randomElement([
		"42663926", // Porter Robinson - Language
		"4159541", // Survivor - Eye of the Tiger
		"24975003", // Hardwell - Cobra
		"108140964" // Katy Perry - Roar
	]);
}