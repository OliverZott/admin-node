import { Router } from "express";
import { AuthenticatedUser, Login, Logout, Register, UpdateInfo, UpdatePassword } from "./controller/auth.controller";
import { CreateUser, Users } from "./controller/user.controller";
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
    router.get('/api/users', AuthMiddleware, Users);
    router.post('/api/users', AuthMiddleware, CreateUser);
}
