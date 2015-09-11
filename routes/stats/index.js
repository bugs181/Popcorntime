var os = require("os")
var config = require('../../config')

module.exports = function(app) {
	app.get('/', serverInfo)
}


function serverInfo(req, res) {
	res.json({
		// Generic server info properties.
		status: 'online', 
		uptime: process.uptime() | 0, 
		server: os.hostname(),
		updated: 'Unknown', // Always up to date. Is this even used anywhere?

		// Added a few more bits of info
		version: "08112015", // Month/Day/Year
		service: "Popcorntime",
		owner: "Media4All"
	});
}