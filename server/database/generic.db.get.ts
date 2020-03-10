import { Db } from "mongodb"
import { connect } from "./db"
import assert from "assert"

/**
 * Accepts formatted search strings and matches against indexed dlName
 * - `<term1> <term2> <term3>`
 * - `\"<exact-search-term>"\`
 * - `- <ignore-matches-term>`
 */
export const textSearch = (
	values: string,
	collectionName: string
): Promise<Array<any>> =>
	connect().then(
		(db: Db | void) =>
			new Promise<Array<any>>(resolve => {
				if (db) {
					const collection = db.collection(collectionName)
					collection
						.find({
							$text: {
								$search: `${values}`
							}
						})
						.toArray((error, response) => {
							assert.equal(error, null)
							console.log(
								`Found the following records: ${JSON.stringify(response)}`
							)
							resolve(response)
						})
				}
			})
	)

interface Generic {
	category: string
	name: string
	credit: Array<string>
}

/**
 * Multi-dimensional db search based on the sum values that are passed
 */
export const genericSearchByValues = (
	options: Partial<Generic> = {},
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
