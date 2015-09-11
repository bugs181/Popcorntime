
module.exports = {
	http: {
		port:  8888
	},

	api: {
		host: "http://localhost:8020/",

		pages: {
			index: "browse",

			shows: "browse/shows",
			movies: "browse/movies",

			info: "/info/",

			search: "search",

			play: "play/",
			stream: "stream/",
			encode: "encode/"
		}
	}
}
