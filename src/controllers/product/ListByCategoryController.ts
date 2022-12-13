import { Request, Response } from "express";
import { ListByCategoryService } from "../../services/product/ListByCategoryService";

class ListByCategoryController {
	async handle(req: Request, res: Response) {

		const category_id = req.query.category_id as string;

		const service = new ListByCategoryService();

		const product = await service.execute({ category_id });

		return res.json(product);
	}
}

export { ListByCategoryController }