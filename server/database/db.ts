import { Db, MongoClient } from "mongodb"
import assert from "assert"

const dbUrl = "mongodb://localhost:27017"
const dbName = "fe_assets"
const dbClient = new MongoClient(dbUrl)
let _db: Db

/**
 * initializes db or resolves a pre-initialized db
 */
export const connect = (): Promise<Db | void> =>
	new Promise<Db>(resolve => {
		if (dbClient.isConnected()) {
			resolve(_db)
		} else {
			dbClient.connect(err => {
				assert.equal(null, err)
				console.log("Successfully connected to mongoDB")
				_db = dbClient.db(dbName)
				resolve(_db)
			})
		}
	}).catch(error => console.log(error))

/**
 * Close the current mongo connection
 */
export const close = (): Promise<void> => dbClient.close()

/**
 * Removes all entries from a specified collection
 */
export const cleanCollection = (collection: string): Promise<void> =>
	new Promise<void>(resolve => {
		connect().then(
			db =>
				db &&
				db
					.collection(collection)
					.drop()
					.catch(() => {
						console.log(`Collection: ${collection} doesn't exist; continuing`)
						resolve()
					})
					.then(() => {
						console.log(`Collection: ${collection} successfully removed.`)
						resolve()
					})
		)
	})
