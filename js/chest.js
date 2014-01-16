setChest = function (title, header, footer, img) {
	document.title = title;
	$('#chest-header').html(header);
	$('#chest-img').attr('src', img);
	$('#chest-footer').html(footer);
}

// Array of different 'Days'
// Most specific days should be at the front of the list
// Required: title, isToday, headers, footers, imagePrefix, numImages
// Optional: tracks, special
var days = [
	{
		title: "Christmas Day",
		isToday: function(date) {
			return date.getDate() == 25 && date.getMonth() == 11;
		},
		headers: ["It's Christmas Day!"],
		footers: [
			"Do you even gift?",
			"I hope you got a bench for Christmas this year.",
			"Christmas dinner hits all your macros."
		],
		imagePrefix: "christmas_",
		numImages: 3,
		tracks: [
			"62682267", // Michael Buble - It's beginning to look a lot like Christmas
			"7863745", // Mariah Kerry - All I want for Christmas is you
			"30815767" // Brenda Lee - Rockin' around the Christmas tree
		],

		special: function() {
			// Dynamically load jquery snow plugin (because we don't want it 364 days of the year...)
			$.getScript("js/jquery.snow.js", function() {
				// Make it snow!
				$.fn.snow({newOn: 50});
			});
		}
	},

	{
		title: "Arnold's Birthday",
		isToday: function(date) {
			// 30th July
			return date.getDate() == 30 && date.getMonth() == 6;
		},
		headers: ["It's Arnold's Birthday!"],
		footers: [
			"Happy Birthday Arnold!",
			"Train chest to wish Arnold many happy returns.",
			"Today is an honorary chest day."
		],
		imagePrefix: "birthday_",
		numImages: 3,
		tracks: [
			"45001128" // Queen - We are the champions
		],
		special: function() {
			$.getScript("js/jquery.snow.js", function() {
				// Confetti!
				$.fn.snow({
					newOn: 100,
					flakeHtml: function() {
						// ★ ◼ ■ ◾ ● ▲ ▶ ◀ ◆ ▰
						return randomElement(["&#9733;","&#9724;","&#9632;","&#9726;","&#9679;","&#9650;","&#9654;","&#9664;","&#9670;","&#9648;"]);
					},
					flakeColor: function() {
						return '#' + Math.random().toString(16).substring(2, 8);
					}
				});
			});
		}
	},

	{
		title: "Chest Day",
		isToday: function(date) {
			return date.getDay() == 1;
		},
		headers: ["It's Chest Day."],
		footers: [
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
		],
		imagePrefix: "yes_",
		numImages: 6,
		tracks: [
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
			"113161136", // Avicii - Hey Brother
			"63726365", // Overwerk - Daybreak
			"40781265", // Savant - Living iPod
			"45784550", // Savant - Splinter
			"13719168", // Shogun - Skyfire
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
			"37492984", // DJ KUBA & NE!TAN - Take it to the Top
			"105455292", // PIXL - Sugar Rush
			"98081145", // Martin Garrix - Animals
			"102286007", // Showtek - Booyah
			"75027559", // Lana Del Rey & Cedric Gervais - Summertime Sadness
			"128147532", // Hardwell - Dare You
			"5199527", // W&W Alpha
			"19514559", // Sandro Silva - Epic
			"67988399", // DER - Our Feeling
			"106914652" // DVBBS & Borgeous - Tsunami
			// "77471974", // 2-second test track
			// "65555191" // 10-second test track
		]
	},

	{
		title: "Not Chest Day",
		isToday: function(date) {
			return date.getDay() != 1;
		},
		headers: ["It's not Chest Day."],
		footers: [
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
		],
		imagePrefix: "no_",
		numImages: 7
	}
];

$(document).ready(function() {
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

	if(isDefined(day.tracks)) {
		addPeakinTrackPlayer(day.tracks);
	}

	if(isDefined(day.special)) {
		day.special();
	}
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

// Just so people can change it to chest day in the console to listen to the tuuunes :)
chestDay = function() {
	for(var i = 0; i < days.length; i++) {
		if(days[i].title == "Chest Day") {
			setDay(days[i]);
		}
	}
}