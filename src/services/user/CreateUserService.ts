import prismaClient from "../../prisma";
import { hash } from "bcryptjs";

interface UserRequest {
	name: string;
	email: string;
	password: string;
}

class CreateUserService {
	async execute({name, email, password}: UserRequest) {

		if(!email){
			throw new Error('email invalido');
		}

		const userExists = await prismaClient.user.findFirst({
			where:{
				email: email
			}
		});

		if(userExists){
			throw new Error("email ja cadastrado");
		}

		const password_hash = await hash(password, 8);

		const user = await prismaClient.user.create({
			data: {
				name: name,
				email: email,
				password: password_hash
			},
			select: {
				id: true,
				name: true,
				email: true
			}
		});

		return user; 
	}
}

export { CreateUserService }