import { Router } from "express";
import multer from "multer";

import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { ListCategoryController } from "./controllers/category/ListCategoryController";
import { CreateProductController } from "./controllers/product/CreateProductController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { CreateUserController } from "./controllers/user/CreateUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";
import { isAuthenticaded } from "./middlewares/isAuthenticaded";

import uploadConfig from './config/multer';
import { ListByCategoryController } from "./controllers/product/ListByCategoryController";
import { CreateOrderController } from "./controllers/order/CreateOrderController";
import { DeleteUserController } from "./controllers/user/DeleteUserController";
import { ListAllUsersController } from "./controllers/user/ListAllUsersController";

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

//rotas order
router.post('/order', isAuthenticaded, new CreateOrderController().handle);

export { router };