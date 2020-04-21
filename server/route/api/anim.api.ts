import { Request, Response, Router } from "express"
import { animSearchByValues } from "../../database/anim.db.get"
import { skillAnimSearchByValues } from "../../database/skill-anim.db.get"
import { spellAnimSearchByValues } from "../../database/spell-anim.db.get"

export const animRouter = Router()

// base path for all routes is 'api/anim'
animRouter.get("/class/:class", (req: Request, res: Response) => {
	// eslint-disable-next-line
	// @ts-ignore for some reason typescript is not finding the full typedef of response...
	animSearchByValues({ feClass: req.params.class }, "animations").then(
		(response) =>
			// eslint-disable-next-line
			// @ts-ignore for some reason typescript is not finding the full typedef of response...
			res.json(response)
	)
})

animRouter.get("/search", (req: Request, res: Response) => {
	// eslint-disable-next-line
	// @ts-ignore for some reason typescript is not finding the full typedef of response...
	animSearchByValues(req.query, "animations").then((response) =>
		// eslint-disable-next-line
		// @ts-ignore for some reason typescript is not finding the full typedef of response...
		res.json(response)
	)
})

animRouter.get("/skill/search", (req: Request, res: Response) => {
	// eslint-disable-next-line
	// @ts-ignore for some reason typescript is not finding the full typedef of response...
	skillAnimSearchByValues(req.query, "animations").then((response) =>
		// eslint-disable-next-line
		// @ts-ignore for some reason typescript is not finding the full typedef of response...
		res.json(response)
	)
})

animRouter.get("/spell/search", (req: Request, res: Response) => {
	// eslint-disable-next-line
	// @ts-ignore for some reason typescript is not finding the full typedef of response...
	spellAnimSearchByValues(req.query, "animations").then((response) =>
		// eslint-disable-next-line
		// @ts-ignore for some reason typescript is not finding the full typedef of response...
		res.json(response)
	)
})
