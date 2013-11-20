function gimmeAPeakinTrack(playListId, callback) {

	var playListId = playListId;
	var videoUrlStart = 'http://www.youtube.com/watch?v=';
	var tracks = [];

	// Get all of the urls in the playlist
	var playListUrl = 'http://gdata.youtube.com/feeds/api/playlists/' + playListId + '?v=2&alt=json';
	
	$.getJSON(playListUrl, function(data) {
		$.each(data.feed.entry, function(i, item) {
			var feedTitle = item.title.$t;
			var feedUrl = item.link[1].href;
			var fragments = feedUrl.split("/");
			var videoId = fragments[fragments.length - 2];

			tracks.push(videoId);
		});

		// Give a random video from the playlist when done
		callback(videoUrlStart + randomElement(tracks));
	});
}