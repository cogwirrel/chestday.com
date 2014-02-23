function PeakinTrackManager(tracks) {
	this.tracks = tracks;
	this.index = 0;
};

PeakinTrackManager.prototype.shuffle = function() {
	var counter = this.tracks.length, temp, index;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        temp = this.tracks[counter];
        this.tracks[counter] = this.tracks[index];
        this.tracks[index] = temp;
    }
}

PeakinTrackManager.prototype.next = function() {
	this.index = this.clamp(this.index + 1);
	return this.tracks[this.index];
}

PeakinTrackManager.prototype.prev = function() {
	this.index = this.clamp(this.index - 1);
	return this.tracks[this.index];
}

PeakinTrackManager.prototype.clamp = function(i) {
	i += this.tracks.length;
	i = i % this.tracks.length;
	return i;
}