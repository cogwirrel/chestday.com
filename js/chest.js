$(document).ready(function() {
  date = new Date();
  day = date.getDay();
  if(day == 1) {
    setChest("Chest Day", "It's Chest Day.", "Go train Chest!", "arnie");
  } else {
    setChest("Not Chest Day", "It's not Chest Day.", "Go train an inferior muscle group.", "crying");
  }
});

setChest = function (title, header, footer, img) {
  document.title = title;
  $('#chest-header').html(header);
  $('#chest-img').attr('src', "img/" + img + ".jpg");
  $('#chest-footer').html(footer);
}