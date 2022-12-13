import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface PayLoad {
	sub: string;
}

export function isAuthenticaded(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const auth_token = req.headers.authorization;

	if (!auth_token) {
		return res.status(401).end();
	}

	const [, token] = auth_token.split(' ');

	try {
		const { sub } = verify(
			token,
			process.env.JWT_SECRET
		) as PayLoad;

		req.user_id = sub;
		
		return next();
	} catch (err) {
		return res.status(401).end();
	}
}