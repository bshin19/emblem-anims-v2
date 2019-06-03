/// DEPENDENCIES ///

const bodyParser = require("body-parser");

// Requiring the models folder for access to mysql methods via db.Method calls
const db = require("./models");

// EXPRESS APP REQUIREMENTS
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing - parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Static directory
app.use(express.static("client/public"));

// Server routes
require("./route/html.js")(app);
require("./route/api.js")(app);

/// END DEPENDENCIES ///

// Sync sequelize models and then start the Express app
// db.sequelize.sync({ force: true }).then(function () { //add force true for restarting db
db.sequelize.sync({ db }).then(function () {
	app.listen(PORT, function () {
		// eslint-disable-next-line
		console.log("App listening on PORT " + PORT);

		//Seeds to DB
		// require("./scripts/repoSeeder");

	});
});

/// END ///
