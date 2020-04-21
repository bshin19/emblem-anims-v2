import { JWT } from "google-auth-library"
import { google } from "googleapis"

/**
 * Validates Google Drive with a service account
 */
export const authorize = (): Promise<void | JWT> =>
	// TODO: strongly type JWTClient
	new Promise<JWT>((resolve, reject) => {
		const email = process.env.GOOGLE_CLIENT_EMAIL
		const key =
			process.env.GOOGLE_PRIVATE_KEY &&
			process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n")
		const scopes = ["https://www.googleapis.com/auth/drive.metadata.readonly"]

		// Initialize a service level JWT auth for back-end api calls
		const JwtClient = new google.auth.JWT(email, undefined, key, scopes)

		JwtClient.authorize((err: Error | null) => {
			if (err) {
				console.log(err)
				reject(err)
			} else {
				console.log("Successfully authenticated to Google Drive")
				resolve(JwtClient)
			}
		})
	}).catch((error) => console.log(error))
