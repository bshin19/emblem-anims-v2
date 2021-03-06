import {
	cleanCollection as dbCleanCollection,
	connect as dbConnect,
} from "./database/db"
import { driveSearchAnims } from "./drive/drive-search-anims"
import { config as envConfig } from "dotenv"
import { router } from "./route"
import { staticAssetsToMongo } from "./local-env-utils.js"
import { textSearch } from "./database/generic.db.get"
import bodyParser from "body-parser"
import express from "express"

envConfig()

// Express Entry Point
const app = express()
const PORT = process.env.PORT || 8080

// Data Parsing via BodyParser
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Static directory
app.use(express.static("client/public"))
app.use(router)

const LOCAL_TEST = true
const SKIP_GOOGLE_DRIVE = false

if (LOCAL_TEST) {
	dbCleanCollection("animations").then(() => {
		app.listen(PORT, (): void => {
			// eslint-disable-next-line
			console.log("App listening on PORT " + PORT)

			if (SKIP_GOOGLE_DRIVE) {
				staticAssetsToMongo()
			} else {
				driveSearchAnims()
			}
		})
	})
} else {
	dbConnect().then(() => {
		app.listen(PORT, (): void => {
			// eslint-disable-next-line
			console.log("App listening on PORT " + PORT)

			textSearch('"Nino F" -el', "animations")
		})
	})
}
