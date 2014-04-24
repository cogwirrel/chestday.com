$(document).ready(function() {

	var tracks = [];

	var trackParam = getParameterByName("track");

	if(trackParam !== "") {
		tracks.push(trackParam);
	} else {
		for(var i = 0; i < days.length; i++) {
			if(days[i].title == "Chest Day") {
				tracks = days[i].tracks;
			}
		}
	}

	// Attach peakinTrackPlayer to window ( skip button uses this global reference :/ )
	window.peakinTrackPlayer = new PeakinTrackPlayer('peakin-track-container', tracks, function() {
		$('#headphone-button').click();
	});
});
