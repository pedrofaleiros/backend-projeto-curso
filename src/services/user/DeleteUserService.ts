import prismaClient from "../../prisma";

interface DeleteRequest {
	user_id: string;
	delete_id: string;
}

class DeleteUserService {
	async execute({ user_id, delete_id }: DeleteRequest) {

		if (user_id !== delete_id) {
			throw new Error('Permissao negada');
		} else {

			const hasUser = await prismaClient.user.findFirst({
				where: {
					id: delete_id
				}
			});

			if (!hasUser) {
				throw new Error('Usuario invalido');
			} else {
				const user = await prismaClient.user.delete({
					where: {
						id: delete_id
					},
					select: {
						name: true,
						email: true,
					}
				});

				return user;
			}
		}
	}
}

export { DeleteUserService }