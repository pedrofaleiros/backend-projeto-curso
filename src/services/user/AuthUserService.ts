import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import prismaClient from "../../prisma";

interface AuthRequest {
	email: string;
	password: string;
}

class AuthUserService {
	async execute({ email, password }: AuthRequest) {

		const user = await prismaClient.user.findFirst({
			where: {
				email: email
			}
		});

		if (!user) {
			throw new Error("Usuario invalido");
		}

		const pass_match = await compare(password, user.password);

		if (!pass_match) {
			throw new Error("Senha incorreta");
		}

		const token = sign(
			{
				name: user.name,
				email: user.email,
			},
			process.env.JWT_SECRET,
			{
				subject: user.id,
				expiresIn: '30d'
			}
		);

		return {
			id: user.id,
			name: user.name,
			email: user.email,
			token: token
		};
	}
}

export { AuthUserService }