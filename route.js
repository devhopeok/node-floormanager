
module.exports = function(app) {

	// ROUTES FOR OUR API
	// =============================================================================

	// middleware to use for all requests

	app.use(function(req, res, next) {
		// do logging
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
		res.header("Access-Control-Allow-Methods", "PUT, POST, GET, PATCH, DELETE");
		next();
	});

	app.use('/api/client', require('./app/client'));

};
