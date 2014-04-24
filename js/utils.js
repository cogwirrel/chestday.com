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

getParameterByName = function(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

Array.prototype.max = function() {
  return Math.max.apply(null, this);
};

Array.prototype.min = function() {
  return Math.min.apply(null, this);
};

Array.prototype.maxIndex = function() {
	var max = -Infinity;
	var maxIndex = 0;
	for(var i = 0; i < this.length; i++) {
		if(this[i] > max) {
			max = this[i];
			maxIndex = i;
		}
	}
	return maxIndex;
}

Array.prototype.average = function() {
	var total = 0;
	for(var i = 0; i < this.length; i++) {
		total += this[i];
	}
	return total / this.length;
}