
module.exports = {

	parseIndex: parseIndex,
	parseInfoPage: parseInfoPage
}


// Media object parsing methods.
function parseIndex(body, req, res) {
	var mediaObjectJSON = body

	var error = false;
	if (!mediaObjectJSON)  error = true
	if (typeof mediaObjectJSON !== "object")  error = true

	if (error) {
		res.status(500).json({ success: false, error: "Internal server error" })
		return
	}

	var mediaObjects = []

	for (var mediaObjectItem of mediaObjectJSON) {
		if (mediaObjectItem) {
			mediaObjects.push( parseMediaObject(mediaObjectItem) )
		}
	}

	res.json(mediaObjects)
}

function parseInfoPage(body, req, res) {
	var mediaObjectJSON = body

	var error = false;
	if (!mediaObjectJSON)  error = true
	if (typeof mediaObjectJSON !== "object")  error = true


	if (error) {
		res.status(500).json({ success: false, error: "Internal server error" })
		return
	}

	// Set up a new media object
	var mediaObject = new mediaObjectClass()

	// Parse media object
	if (!mediaObjectJSON.info && req.params.mediaURL)  mediaObjectJSON.info = "/" + req.params.mediaURL //.substring(1)
	mediaObject = parseMediaObject(mediaObjectJSON)

	res.json(mediaObject)
}

function parseMediaObject(mediaObjectItem) {
	// This function returns a mediaObject formatted JSON object.

	// todo: verify all required fields exist before returning mediaObject
	// otherwise return empty mediaObject

	// console.log("Missing property: " + missingProperty)
	// return { }

	// Set up a new media object
	var mediaObject = new mediaObjectClass()
	
	var mediaID = mediaObjectItem.portal + mediaObjectItem.info
	mediaObject._id = mediaID
	mediaObject.imdb_id = mediaID // Should change to actual imdb id when viewing info page.
	mediaObject.tvdb_id = mediaID
	
	mediaObject.title = mediaObjectItem.title
	mediaObject.year = mediaObjectItem.year || ""

	if (mediaObjectItem.images)  mediaObject.images.poster = mediaObjectItem.images.poster
	mediaObject.slug = mediaObjectItem.title.replace(" ", "-")
	mediaObject.rating.percentage = mediaObjectItem.rating

	//mediaObject.genres = ["Comedy"]
	mediaObject.genres = ((mediaObjectItem.genres && mediaObjectItem.genres.length >= 1) ? mediaObjectItem.genres : ["Not Available"])

	// Not always available info
	mediaObject.synopsis = mediaObjectItem.synopsis
	mediaObject.num_seasons = mediaObjectItem.seasons
	//mediaObject.runtime = mediaObjectItem.runtime
	//mediaObject.runtime = "60"
	mediaObject.runtime = "~"

	//mediaObject.rating.percentage = "~"

	return mediaObject;
}


function mediaObjectRequiredClass() {
	this._id = undefined // String
	this.title = undefined // String
	this.year = undefined // String

	this.synopsis = undefined // String
	this.runtime = undefined // String

	this.images = {
		poster: undefined // String
	}

	this.rating = {
		percentage: undefined // String or Number
	}

	this.genres = undefined // Array of strings
}

function mediaObjectClass() {

	this._id = undefined // String
	this.imdb_id =  undefined // String
	this.tvdb_id = undefined // String

	this.title = undefined // String
	this.year = undefined // String

	this.images = {
		banner: undefined, // String
		fanart: undefined, // String
		poster: undefined // String
	}

	this.slug = undefined // String
	this.rating = {
		percentage: undefined // Number
	}

	this.genres = undefined // String

	// Not always available info
	this.synopsis = undefined // String

	this.num_seasons = undefined // Number
	this.runtime = undefined // String

	this.episodes = [
		{
			first_aired: undefined, // epoch format in integer
			date_based: false,
			overview: undefined, // String
			title: undefined, // String
			season: undefined, // Number
			episode: undefined, // Number
			tvdb_id: undefined, // Number or String

			files: [],

			torrents:{
				0:{
					peers:0,
					seeds:4572,
					url:"magnet:?xt=urn:btih:9FB267CFF5AE5603F07A347676EC3BF3E35F75E1&dn=game+of+thrones+s05e02+hdtv+x264+xclusive+eztv+&tr=udp%3A%2F%2Ftracker.publicbt.com%2Fannounce&tr=udp%3A%2F%2Fopen.demonii.com%3A1337"
				},
				"480p":{
					peers:0,
					seeds:4572,
					url:"magnet:?xt=urn:btih:9FB267CFF5AE5603F07A347676EC3BF3E35F75E1&dn=game+of+thrones+s05e02+hdtv+x264+xclusive+eztv+&tr=udp%3A%2F%2Ftracker.publicbt.com%2Fannounce&tr=udp%3A%2F%2Fopen.demonii.com%3A1337"
				}
			},

			watched: {
				watched: false // Status, can be set on server?
			},

		}
	]

}

// todo: fill in the gaps with outside services
// "status": "returning series",
// and a correct epoch date for airtime

// "network":"HBO",

function mediaObjectSource() {
	this.source = undefined // Example: "vidbull.com"
	this.url = undefined // String
}

function mediaObjectActor() {
	this.name = undefined // String
	this.URL = undefined // String
}

function mediaObjectGenre() {
	this.title = undefined // String
	this.URL = undefined // String
}

function mediaObjectImages() {
	this.poster = undefined // String
}

function mediaObjectEpisodeRequired() {
	this.overview = undefined // String
	this.title = undefined // String
	this.season = undefined // Number
	this.episode = undefined // Number
	this.tvdb_id = undefined // Number or String
}

function mediaObjectEpisode() {
	this.first_aired = undefined // epoch format in integer
	this.date_based = false
	this.overview = undefined // String
	this.title = undefined // String
	this.season = undefined // Number
	this.episode = undefined // Number
	this.tvdb_id = 1 // Number or String

	this.files = []

	this.torrents = {
		0:{
			peers:0,
			seeds:4572,
			url:"magnet:?xt=urn:btih:9FB267CFF5AE5603F07A347676EC3BF3E35F75E1&dn=game+of+thrones+s05e02+hdtv+x264+xclusive+eztv+&tr=udp%3A%2F%2Ftracker.publicbt.com%2Fannounce&tr=udp%3A%2F%2Fopen.demonii.com%3A1337"
		},
		"480p":{
			peers:0,
			seeds:4572,
			url:"magnet:?xt=urn:btih:9FB267CFF5AE5603F07A347676EC3BF3E35F75E1&dn=game+of+thrones+s05e02+hdtv+x264+xclusive+eztv+&tr=udp%3A%2F%2Ftracker.publicbt.com%2Fannounce&tr=udp%3A%2F%2Fopen.demonii.com%3A1337"
		}
	},

	this.watched = {
		watched: false // Status, can be set on server?
	}
}

// todo: move this file to a common area, that can be used for Movies routes too.
