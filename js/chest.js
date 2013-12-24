setChest = function (title, header, footer, img) {
	document.title = title;
	$('#chest-header').html(header);
	$('#chest-img').attr('src', img);
	$('#chest-footer').html(footer);
}

$(document).ready(function() {
	date = new Date();

	if(date.getDate() == 25 && date.getMonth() == 11) {
		christmasDay();
	} else if(date.getDay() == 1) {
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

christmasDay = function() {
	setChest("Christmas Day", "It's Christmas Day!", christmasFooter(), randomImage("christmas_", 1, 3));
	$.fn.snow({newOn: 50});
}

addPeakinTrackPlayer = function() {

	var peakinTrackIcon = "<a href=\"javascript:void(0);\" id=\"headphone-button\"><i class=\"fa fa-headphones\"></i></a>";
	$('#peakin-track-container').html(peakinTrackIcon);

	// Attach peakinTrackPlayer to window ( skip button uses this global reference :/ )
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
	"Make Arnold proud!",
	"Get pumped with a peakin' track!",
	"Psych yourself up with the headphones below!",
	"Get amped with the headphones below!"
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

christmasFooter = function() {
	return randomElement([
		"Do you even gift?",
		"I hope you got a bench for Christmas this year.",
		"Christmas dinner hits all your macros."
	]);
}