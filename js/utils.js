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

/* Returns whether an object is defined */
isDefined = function(obj) {
	return !(typeof obj === "undefined");
}