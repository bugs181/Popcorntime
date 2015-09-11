
module.exports = function(app) {

	// Index route
	require("./routes/stats")(app)

	// Media specific routes, like TV Shows, Movies, and Music
	require("./routes/shows")(app)
	require("./routes/movies")(app)

}