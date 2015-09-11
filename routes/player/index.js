
module.exports = function(app) {
	app.get('/stream/:mediaURL', playURL);
}


function playURL(req, res) {
  // The URL of the file from the portal. (of the provider, ie vidbull, etc)

  // Load file from mediaURL
  // Stream it to Popcorntime

  // todo: open ../bunny.mp4  stream to client
  console.log("Trying to play file")

  var path = require("path")
  res.sendFile(path.resolve("bunny.mp4"))

  // localhost:8888/stream/bunny.mp4

  // todo: create a round robin URL loader.. with res.redirect() to media url.
}