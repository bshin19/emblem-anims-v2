import { Anim } from "../drive/anim.definitions"
import { Db } from "mongodb"
import { connect } from "./db"
import assert from "assert"
/**
 * Multi-dimensional db search based on the sum values that are passed
 */
export const animSearchByValues = (
	options: Partial<Anim>,
	collectionName: string
): void => {
	connect().then(
		(db: Db | void): Promise<Array<any>> =>
			new Promise<Array<any>>(resolve => {
				if (db) {
					const collection = db.collection(collectionName)
					collection.find(options).toArray((error, response) => {
						assert.equal(error, null)
						console.log(
							`Found the following records: ${JSON.stringify(response)}`
						)
						resolve(response)
					})
				}
			})
	)
}
