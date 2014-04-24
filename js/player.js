$(document).ready(function() {

	var tracks = [];

	var trackParam = getParameterByName("track");

	for(var i = 0; i < days.length; i++) {
		if(days[i].title == "Chest Day") {
			tracks = days[i].tracks;
		}
	}

	// Attach peakinTrackPlayer to window ( skip button uses this global reference :/ )
	window.peakinTrackPlayer = new PeakinTrackPlayer('peakin-track-container', tracks, function() {
		if(trackParam !== "") {
			window.peakinTrackPlayer.switchTracks(trackParam);
		}
		
		$('#headphone-button').click();
	});
});

setTrack = function() {
	var track = $('#track-input').val();
	if(!isNaN(track)) {
		window.peakinTrackPlayer.switchTracks(track);
	}
}