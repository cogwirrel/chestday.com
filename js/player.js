$(document).ready(function() {

	// Initialize soundcloud!
	SC.initialize({
		client_id: '8eaeb95d4bf84d06f0001a18f55695a2'
	});

	var _with = getParameterByName('with');

	if(_with !== "") {
		startPlayer([_with]);
	} else {
		startPlayer(['pop', 'rock', 'electro']);
	}

	$("#track-input").on('keyup', function (e) {
	    if (e.keyCode == 13) {
	        setTrack();
	    }
	});

});

startPlayer = function(keywords) {
	// Attach peakinTrackPlayer to window ( skip button uses this global reference :) )
	window.peakinTrackPlayer = new PeakinTrackPlayer('peakin-track-container', null, keywords, function() {
		$('#headphone-button').click();
	});
};

setTrack = function() {
	var keywords = $('#track-input').val();
	console.log("Looking for: " + keywords);
	if(keywords) {
		window.peakinTrackPlayer.randomPlaylist(keywords);
	}
}