import express, { Request, Response, NextFunction } from "express";
import 'express-async-errors';
import path from 'path';


import cors from 'cors';
import { router } from "./routes";

const PORT = 3333;

const app = express();

app.use(express.json());

app.use(cors());

app.use(router);

app.use(
	'/files',
	express.static(path.resolve(__dirname, '..', 'temp'))
);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
	if (err instanceof Error) {
		return res.status(400).json({ error: err.message });
	}

	return res.status(500).json(
		{ status: "error", message: "internal server error" }
	);
});

app.listen(PORT, () => {
	console.log('ativo na porta', PORT);
});