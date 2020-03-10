import { assetsToDB } from "./database/assets-to-db"
import fs from "fs"

/**
 * Utility method for development that skips the google drive steps
 */
export const staticAssetsToMongo = (): void => {
	fs.readFile("../animations.json", "utf-8", (err, data) => {
		if (err) throw err
		assetsToDB(JSON.parse(data), "animations").then(() => {
			console.log("assetsToDB success!")
		})
	})
}
