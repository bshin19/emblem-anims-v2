import assert from "assert"
// import fs from "fs"
import { Anims } from "../drive/anim.definitions"
import { connect } from "./db"

/**
 * Populates a database collection with a formatted json
 */
export const assetsToDB = (
	assets: Anims,
	collectionName: string
): Promise<void> =>
	new Promise<void>(resolve => {
		connect().then(db => {
			// fs.writeFile(`${collectionName}.json`, JSON.stringify(assets, null, 2), (error => console.log(error)))
			if (db) {
				const collection = db.collection(collectionName)
				collection.insertMany(assets, error => {
					assert.equal(error, null)
					resolve()
					// console.log(`inserted JSON: ${JSON.stringify(response.ops)}`)
				})
				collection.createIndex({ dlName: "text" })
			}
		})
	})
