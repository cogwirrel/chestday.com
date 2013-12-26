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
	
	addPeakinTrackPlayer([
		"42663926", // Porter Robinson - Language
		"4159541", // Survivor - Eye of the Tiger
		"53045153", // Madeon - Finale
		"103719057", // Madeon - Technicolour
		"57893809", // Madeon - The City
		"37889463", // Madeon - Icarus
		"3911205", // Madeon - Shuriken
		"108140964", // Katy Perry - Roar
		"54833549", // Alesso - Years
		"44509875", // Rudimental - Feel the Love
		"97617992", // Avicii - Wake me up
		"63726365", // Overwerk - Daybreak
		"40781265", // Savant - Living iPod
		"45784550", // Savant - Splinter
		"13719168", // Shogun - Skyfire
		"31027910", // Michael Calfan - Resurrection
		"23142795", // Avicii - Levels
		"44820594", // Nadia Ali - Believe it
		"50795768", // Alesso - Titanium
		"6058181", // Pendulum - The Island (Madeon Remix)
		"55945671", // Swedish House Mafia - Don't you worry child
		"48124146", // Swedish House Mafia - Greyhound
		"26685551", // Avicii & Tiesto - Escape Me
		"59811918", // Shinedown - Unity (Matisse & Sadko Remix)
		"67439229", // Alexo - 3am
		"92373892", // Sebastian Ingrosso & Tommy Trash - Reload
		"37492984" // DJ KUBA & NE!TAN - Take it to the Top
		// "77471974", // 2-second test track
		// "65555191" // 10-second test track
	]);
}

notChestDay = function() {
	setChest("Not Chest Day", "It's not Chest Day.", notChestDayFooter(),  randomImage("no_", 1, 7));
}

christmasDay = function() {
	setChest("Christmas Day", "It's Christmas Day!", christmasFooter(), randomImage("christmas_", 1, 3));
	$.fn.snow({newOn: 50});

	addPeakinTrackPlayer([
		"62682267", // Michael Buble - It's beginning to look a lot like Christmas
		"7863745", // Mariah Kerry - All I want for Christmas is you
		"30815767" // Brenda Lee - Rockin' around the Christmas tree
	]);
}

addPeakinTrackPlayer = function(tracks) {

	var peakinTrackIcon = "<a href=\"javascript:void(0);\" id=\"headphone-button\"><i class=\"fa fa-headphones\"></i></a>";
	$('#peakin-track-container').html(peakinTrackIcon);

	// Attach peakinTrackPlayer to window ( skip button uses this global reference :/ )
	window.peakinTrackPlayer = new PeakinTrackPlayer(tracks);

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