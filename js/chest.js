randomImage = function (prefix, lower, upper) {
  return "img/" + prefix + random(lower, upper) + ".jpg"
}

/* Returns a number between lower and upper, inclusive */
random = function (lower, upper) {
  return lower + Math.floor(Math.random()*(upper + 1 - lower))
}

/* Returns a random element from the given array */
randomElement = function (array) {
  return array[ random(0, array.length - 1) ];
}

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
    setChest("Chest Day", "It's Chest Day.", chestDayFooter(), randomImage("yes_", 1, 6));
  } else {
    setChest("Not Chest Day", "It's not Chest Day.", notChestDayFooter(),  randomImage("no_", 1, 7));
  }
});

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
    "Go hard or go home!"
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
    "What's the point?"
    ]);
}