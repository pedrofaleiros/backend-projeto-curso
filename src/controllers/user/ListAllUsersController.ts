import { Request, Response } from "express";
import { ListAllUsersService } from "../../services/user/ListAllUsersService";

class ListAllUsersController {
	async handle(req: Request, res: Response) {

		const service = new ListAllUsersService();

		const users = await service.execute();

		return res.json(users);
	}
}

export { ListAllUsersController }