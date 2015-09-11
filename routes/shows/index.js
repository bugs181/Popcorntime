var config = require('../../config.js')

// Helper modules
var http = require("./helpers/http")
var mediaParser = require("./mediaParser")

module.exports = function(app) {
	
	app.get('/shows/:pagination', getShows)
	app.get('/show/:portal/:mediaURL', getShow)

}


function getShows(req, res) {
  var api = config.api
  var mediaURL

  var keywords = req.query.keywords
  if (keywords) {
    mediaURL = api.host + api.pages.search + '?term=' + keywords
  } else {
    var pagination = req.params.pagination || 1
    mediaURL = api.host + api.pages.shows + "?page=" + pagination
  }

  http.loadPage(mediaURL, function(body) {
    mediaParser.parseIndex(body, req, res)
  })
}

function getShow(req, res) {
/*
  var path = require("path")
  res.sendFile(path.resolve("test.json"));
  return;
*/

  var api = config.api
  var apiURL = api.host + req.params.portal + api.pages.info + req.params.mediaURL

  http.loadPage(apiURL, function(body) {
    mediaParser.parseInfoPage(body, req, res)
  })
}

// todo: Provide route examples;
// /shows/1
// /show/primewire.ag/someSourceUrl