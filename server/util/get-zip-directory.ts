import { Request, Response } from "express";
import archiver from "archiver";
import fs from "fs";

export const getZippedDirectory = (req: Request, res: Response): void => {
	const out = `${process.cwd()}/public/${req.params.path}.zip`;
	const source = `./public/${req.query.path}`;
	const archive = archiver("zip", { zlib: { level: 9 } });

	const promise = new Promise((resolve, reject): void => {

		const stream = fs.createWriteStream(out);
		archive
			.directory(source, false)
			.on("error", (err): void => {
				// eslint-disable-next-line
				console.log(err);
				reject(err);
			})
			.on("warning", (err): void => {
				if (err.code === "ENOENT") {
					// log warning
				} else {
					// throw error
					throw err;
				}
			})
			.pipe(stream);

		stream.on("close", (): void => {
			// eslint-disable-next-line
			console.log("success ", archive.pointer());
			resolve();
		});
		stream.on("error", (err): void => {
			// eslint-disable-next-line
			console.log(err);
		});

		archive.finalize();

	});
	promise.then(
		(): void => {
			res.json(`/${req.params.path}.zip`);
		},
		// eslint-disable-next-line
		error => console.log(error));
};
