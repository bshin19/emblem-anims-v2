import { Request, Response } from "express";
import path from "path";

export const htmlRoutes = (req: Request, res: Response): void => {
	res.sendFile(path.join(__dirname, "../client/src/index.html"));
};
