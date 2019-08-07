import bodyParser from "body-parser";
import express from "express";
import htmlRoutes from "./route/html.js";
import apiRoutes from "./route/api.js";
import db from "./database/model";

// Express Entry Point
const app = express();
const PORT = process.env.PORT || 8080;

// Data Parsing via BodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Static directory
app.use(express.static("client/public"));

htmlRoutes(app);
apiRoutes(app);

// Sync sequelize models and then start the Express app
// db.sequelize.sync({ force: true }).then(function () { //add force true for restarting db
db.sequelize.sync({ db }).then(function (): void {
	app.listen(PORT, function (): void {
		// eslint-disable-next-line
		console.log("App listening on PORT " + PORT);

		// Uncomment to seed local repo
		// require("./scripts/repoSeeder");

	});
});
