import { Request, Response, Router } from "express"
import { animRouter } from "./anim.api"
import { genericSearchByValues } from "../../database/generic.db.get"

// base path for all routes is /api
export const apiRouter = Router()

apiRouter.use("/anim", animRouter)

apiRouter.get(
	"/text-search/:text/:collection",
	(req: Request, res: Response) => {
		// eslint-disable-next-line
		// @ts-ignore for some reason typescript is not finding the full typedef of response...
		textSearch(req.params.text, req.params.collection).then((response) =>
			// eslint-disable-next-line
			// @ts-ignore for some reason typescript is not finding the full typedef of response...
			res.json(response)
		)
	}
)

apiRouter.get("/search/:collection", (req: Request, res: Response) => {
	// eslint-disable-next-line
	// @ts-ignore for some reason typescript is not finding the full typedef of response...
	genericSearchByValues(req.query, req.params.collection).then((response) =>
		// eslint-disable-next-line
		// @ts-ignore for some reason typescript is not finding the full typedef of response...
		res.json(response)
	)
})
