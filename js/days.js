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
		playlist: 'michael-buble-christmas-songs',
		randomPlaylistKeywords: ['christmas', 'christmas songs', 'christmas buble'],
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
			"Today is an honorary chest day.",
			"Arnold's training chest all day, so should you."
		],
		imagePrefix: "birthday_",
		numImages: 4,
		tracks: [
			"45001128" // Queen - We are the champions
		],
		randomPlaylistKeywords: ['Arnold Schwarzenegger'],
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
		headers: ["It's Chest Day"],
		footers: [
			"Go train chest!",
			"What are you waiting for?!",
			"Hit the gym!",
			"Get on the bench now!",
			"Why aren't you on the bench?!",
			"You should be under a barbell right now.",
			"Time to pump iron!",
			"Smash it!",
			"Pump iron like Arnold!",
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
		playlist: 'chestdaypeakintracks',
		randomPlaylistKeywords: ['gym', 'chest day', 'workout', 'big drop'],
	},

	{
		title: "Not Chest Day",
		isToday: function(date) {
			return date.getDay() != 1;
		},
		headers: ["It's not Chest Day"],
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
