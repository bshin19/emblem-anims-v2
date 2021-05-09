import { Request, Response, Router } from "express"
import { apiRouter } from "./api"
import path from "path"

export const router = Router()

// React router handles all html routing other than the base request
const htmlRoute = (req: Request, res: Response): void => {
	// eslint-disable-next-line
	// @ts-ignore for some reason typescript is not finding the full typedef of response...
	res.sendFile(path.join(__dirname, "../../client/build/index.html"))
}

router.use("/api/v1", apiRouter)

router.use(htmlRoute)
