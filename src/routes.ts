import express from "express";
import { AuthenticatedUser, Login, Logout, Register, UpdateInfo, UpdatePassword } from "./controller/auth.controller";
import { Upload } from "./controller/image.controller";
import { Chart, Export, GetAllOrders, GetOrder } from "./controller/orders.controller";
import { GetPermissions } from "./controller/permission.controller";
import { CreateProduct, DeleteProduct, GetProduct, Products, UpdateProduct } from "./controller/product.controller";
import { CreateRole, DeleteRole, GetRole, GetRoles, UpdateRole } from "./controller/role.controller";
import { CreateUser, DeleteUser, GetUser, UpdateUser, Users } from "./controller/user.controller";
import { AuthMiddleware } from "./middleware/auth.middleware";
import PermissionMiddleware from "./middleware/permission.middleware";

const router = express.Router();

/** User api-endpoints */
router.post('/register', Register);
router.post('/login', Login);
router.post('/logout', AuthMiddleware, Logout);
router.get('/user', AuthMiddleware, AuthenticatedUser);
router.put('/user/info', AuthMiddleware, UpdateInfo);
router.put('/user/password', AuthMiddleware, UpdatePassword);

/** Admin api-endpoints */
router.post('/users', AuthMiddleware, CreateUser);
router.get('/users', AuthMiddleware, Users);
router.get('/users/:id', AuthMiddleware, GetUser);
router.put('/users/:id', AuthMiddleware, UpdateUser);
router.delete('/users/:id', AuthMiddleware, DeleteUser);

router.get('/permissions', AuthMiddleware, GetPermissions)
router.get('/roles', AuthMiddleware, GetRoles)
router.get('/roles/:id', AuthMiddleware, GetRole)
router.post('/roles', AuthMiddleware, CreateRole)
router.put('/roles/:id', AuthMiddleware, UpdateRole)
router.delete('/roles/:id', AuthMiddleware, DeleteRole)

router.get('/products', AuthMiddleware, PermissionMiddleware('products'), Products)
router.get('/products/:id', AuthMiddleware, GetProduct)
router.post('/products', AuthMiddleware, CreateProduct)
router.put('/products/:id', AuthMiddleware, PermissionMiddleware('products'), UpdateProduct)
router.delete('/products/:id', AuthMiddleware, PermissionMiddleware('products'), DeleteProduct)

router.get('/orders', AuthMiddleware, GetAllOrders)
router.get('/orders/:id', AuthMiddleware, GetOrder)

router.post('/upload', AuthMiddleware, Upload);
router.use('/uploads', express.static('./uploads'));  // make folder static (public) to get images

router.post('/export', AuthMiddleware, Export)

router.get('/chart', AuthMiddleware, Chart)

export default router;