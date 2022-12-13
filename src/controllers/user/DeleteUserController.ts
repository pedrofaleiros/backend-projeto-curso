import { Request, Response } from "express";
import { DeleteUserService } from "../../services/user/DeleteUserService";

class DeleteUserController {
	async handle(req: Request, res: Response){

		const {delete_id} = req.body;
		const user_id = req.user_id;

		const service = new DeleteUserService();

		const user = await service.execute({user_id, delete_id});

		return res.json(user);
	}
}

export { DeleteUserController }