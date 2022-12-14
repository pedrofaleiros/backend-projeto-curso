import { Router } from "express";
import multer from "multer";
import uploadConfig from './config/multer';

import { isAuthenticaded } from "./middlewares/isAuthenticaded";
import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { ListCategoryController } from "./controllers/category/ListCategoryController";
import { CreateProductController } from "./controllers/product/CreateProductController";
import { ListByCategoryController } from "./controllers/product/ListByCategoryController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { CreateUserController } from "./controllers/user/CreateUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";
import { ListAllUsersController } from "./controllers/user/ListAllUsersController";
import { DeleteUserController } from "./controllers/user/DeleteUserController";
import { CreateOrderController } from "./controllers/order/CreateOrderController";
import { RemoveOrderController } from "./controllers/order/RemoveOrderController";
import { ListOrderController } from "./controllers/order/ListOrderController";
import { AddItemController } from "./controllers/order/AddItemController";
import { ListProductController } from "./controllers/product/ListProductController";
import { RemoveItemController } from "./controllers/order/RemoveItemController";
import { SendOrderController } from "./controllers/order/SendOrderController";
import { DetailOrderController } from "./controllers/order/DetailOrderController";
import { FinishOrderController } from "./controllers/order/FinishOrderController";

const router = Router();

const upload = multer(uploadConfig.upload("./temp"));

//rotas users
router.post('/users', new CreateUserController().handle);
router.post('/session', new AuthUserController().handle);
router.get('/me', isAuthenticaded, new DetailUserController().handle);

router.delete('/users', isAuthenticaded, new DeleteUserController().handle);
router.get('/users', isAuthenticaded, new ListAllUsersController().handle);

//rotas categoria
router.post('/category', isAuthenticaded, new CreateCategoryController().handle);
router.get('/category', isAuthenticaded, new ListCategoryController().handle);

//rotas produto
router.post('/product', isAuthenticaded, upload.single('file'), new CreateProductController().handle);
router.get('/category/product', isAuthenticaded, new ListByCategoryController().handle);
router.get('/product', isAuthenticaded, new ListProductController().handle);

//rotas order
router.get('/orders', isAuthenticaded, new ListOrderController().handle);
router.post('/order', isAuthenticaded, new CreateOrderController().handle);
router.delete('/order', isAuthenticaded, new RemoveOrderController().handle);
router.post('/order/add', isAuthenticaded, new AddItemController().handle);
router.delete('/order/remove', isAuthenticaded, new RemoveItemController().handle);
router.put('/order/send', isAuthenticaded, new SendOrderController().handle);
router.get('/order/detail', isAuthenticaded, new DetailOrderController().handle);
router.put('/order/finish', isAuthenticaded, new FinishOrderController().handle);

export { router };