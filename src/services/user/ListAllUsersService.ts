import prismaClient from "../../prisma";

class ListAllUsersService {
	async execute(){

		const users = prismaClient.user.findMany({
			select: {
				name: true,
				email: true,
			}
		});

		return users;
	}
}

export { ListAllUsersService }