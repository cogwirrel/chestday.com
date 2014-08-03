setChest = function (title, header, footer, img) {
	document.title = title;
	$('#chest-header').html(header);
	setImage(img);
	$('#chest-footer').html(footer);
}

setImage = function(img) {
	$('#chest-img').attr('src', img);
}

$(document).ready(function() {
	// Check whether we're mobile
	if(!(typeof AndroidChestDay === "undefined")) {
		$('#chest-img').height(200);
		$('#squat-img-container').hide();
	}

	date = new Date();

	for(var i = 0; i < days.length; i++) {
		var day = days[i];
		if(day.isToday(date)) {
			setDay(day);
			break;
		}
	}
});

setDay = function(day) {
	setChest(
		day.title,
		randomElement(day.headers),
		randomElement(day.footers),
		randomImage(day.imagePrefix, 1, day.numImages)
	);

	if(isDefined(day.tracks) && typeof AndroidChestDay === "undefined") {
		addPeakinTrackPlayer(day.tracks);
	}

	if(isDefined(day.special)) {
		day.special();
	}
}

addPeakinTrackPlayer = function(tracks) {
	// Attach peakinTrackPlayer to window ( skip button uses this global reference :/ )
	window.peakinTrackPlayer = new PeakinTrackPlayer('peakin-track-container', tracks);

	// Get rid of the squat icon
	$('#squat-img-container').hide();
}

// Just so people can change it to chest day in the console to listen to the tuuunes :)
chestDay = function() {
	for(var i = 0; i < days.length; i++) {
		if(days[i].title == "Chest Day") {
			setDay(days[i]);
		}
	}
}
