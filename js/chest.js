setChest = function (title, header, footer, img) {
	document.title = title;
	$('#chest-header').html(header);
	$('#chest-img').attr('src', img);
	$('#chest-footer').html(footer);
}

$(document).ready(function() {
	date = new Date();
	day = date.getDay();

	if(day == 1) {
		chestDay();
	} else {
		notChestDay();
	}
});

chestDay = function() {
	setChest("Chest Day", "It's Chest Day.", chestDayFooter(), randomImage("yes_", 1, 6));
	
	addPeakinTrackPlayer();
}

notChestDay = function() {
	setChest("Not Chest Day", "It's not Chest Day.", notChestDayFooter(),  randomImage("no_", 1, 7));
}

addPeakinTrackPlayer = function() {

	var peakinTrackIcon = "<a href=\"#\" id=\"headphone-button\"><i class=\"fa fa-headphones\"></i></a>";
	$('#peakin-track-container').html(peakinTrackIcon);

	window.peakinTrackPlayer = new PeakinTrackPlayer();

	$('#headphone-button').click(function(event) {
		peakinTrackPlayer.togglePlay();
	});
	
}

chestDayFooter = function () {
  return randomElement([
	"Go train chest!",
	"What are you waiting for?!",
	"Hit the gym!",
	"Get on the bench now!",
	"Why aren't you on the bench?!",
	"You should be under a barbell right now.",
	"Time to pump iron!",
	"Smash it!",
	"Pump it like Arnold!",
	"Why aren't you under a barbell?!",
	"Go hard or go home!",
	"Train like a beast!",
	"Why are you still looking at this?!",
	"Go own the bench!",
	"Cancel your date.",
	"Make Arnold proud!"
	]);
}

notChestDayFooter = function () {
  return randomElement([
	"Go train an inferior muscle group.",
	"Maybe train legs? ...Nah",
	"It's not worth going.",
	"Don't even bother.",
	"Just go home.",
	"Go back to bed.",
	"What's the point?",
	"Shouldn't have taken your preworkout.",
	"Guess it's biceps again.",
	"Hang up your tank."
	]);
}