randomImage = function (prefix, lower, upper) {
  return "img/" + prefix + random(lower, upper) + ".jpg"
}

/* Returns a number between lower and upper, inclusive */
random = function (lower, upper) {
  return lower + Math.floor(Math.random()*(upper + 1 - lower))
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
    setChest("Chest Day", "It's Chest Day.", "Go train Chest!", randomImage("yes_", 1, 4));
  } else {
    setChest("Not Chest Day", "It's not Chest Day.", "Go train an inferior muscle group.",  randomImage("no_", 1, 3));
  }
});
