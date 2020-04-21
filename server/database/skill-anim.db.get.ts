import { Db } from "mongodb"
import { SkillAnim } from "../drive/anim.definitions"
import { connect } from "./db"
import assert from "assert"

/**
 * Multi-dimensional db search based on the sum values that are passed
 */
export const skillAnimSearchByValues = (
	options: Partial<SkillAnim> = {},
	collectionName: string
): void => {
	connect().then(
		(db: Db | void) =>
			new Promise<Array<any>>((resolve) => {
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
