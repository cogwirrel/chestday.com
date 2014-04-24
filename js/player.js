$(document).ready(function() {

	var tracks = [];
	for(var i = 0; i < days.length; i++) {
		if(days[i].title == "Chest Day") {
			tracks = days[i].tracks;
		}
	}

	// Attach peakinTrackPlayer to window ( skip button uses this global reference :/ )
	window.peakinTrackPlayer = new PeakinTrackPlayer('peakin-track-container', tracks);
});
