import express, { Router } from "express";
import { AuthenticatedUser, Login, Logout, Register, UpdateInfo, UpdatePassword } from "./controller/auth.controller";
import { Upload } from "./controller/image.controller";
import { Chart, Export, GetAllOrders, GetOrder } from "./controller/orders.controller";
import { GetPermissions } from "./controller/permission.controller";
import { CreateProduct, DeleteProduct, GetProduct, Products, UpdateProduct } from "./controller/product.controller";
import { CreateRole, DeleteRole, GetRole, GetRoles, UpdateRole } from "./controller/role.controller";
import { CreateUser, DeleteUser, GetUser, UpdateUser, Users } from "./controller/user.controller";
import { AuthMiddleware } from "./middleware/auth.middleware";


export const routes = (router: Router) => {
    /** User api-endpoints */
    router.post('/api/register', Register);
    router.post('/api/login', Login);
    router.post('/api/logout', AuthMiddleware, Logout);
    router.get('/api/user', AuthMiddleware, AuthenticatedUser);
    router.put('/api/user/info', AuthMiddleware, UpdateInfo);
    router.put('/api/user/password', AuthMiddleware, UpdatePassword);

    /** Admin api-endpoints */
    router.post('/api/users', AuthMiddleware, CreateUser);
    router.get('/api/users', AuthMiddleware, Users);
    router.get('/api/users/:id', AuthMiddleware, GetUser);
    router.put('/api/users/:id', AuthMiddleware, UpdateUser);
    router.delete('/api/users/:id', AuthMiddleware, DeleteUser);

    router.get('/api/permissions', AuthMiddleware, GetPermissions)
    router.get('/api/roles', AuthMiddleware, GetRoles)
    router.get('/api/roles/:id', AuthMiddleware, GetRole)
    router.post('/api/roles', AuthMiddleware, CreateRole)
    router.put('/api/roles/:id', AuthMiddleware, UpdateRole)
    router.delete('/api/roles/:id', AuthMiddleware, DeleteRole)

    router.get('/api/products', AuthMiddleware, Products)
    router.get('/api/products/:id', AuthMiddleware, GetProduct)
    router.post('/api/products', AuthMiddleware, CreateProduct)
    router.put('/api/products/:id', AuthMiddleware, UpdateProduct)
    router.delete('/api/products/:id', AuthMiddleware, DeleteProduct)

    router.get('/api/orders', AuthMiddleware, GetAllOrders)
    router.get('/api/orders/:id', AuthMiddleware, GetOrder)

    router.post('/api/upload', AuthMiddleware, Upload);
    router.use('/api/uploads', express.static('./uploads'));  // make folder static (public) to get images

    router.post('/api/export', AuthMiddleware, Export)

    router.get('/api/chart', AuthMiddleware, Chart)
}
