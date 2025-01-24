import { Request, Response, NextFunction } from 'express';
import { User } from '../entity/user.entity';

export default function PermissionMiddleware(access: string) {
    return (req: Request, res: Response, next: NextFunction): void => {
        const user: User = req.body['user'];

        let permissions;

        try {
            permissions = user.role.permissions;
        } catch (error) {
            res.status(401).send({ message: 'No Permissions! You are unauthorized :(' });
            return;
        }

        if (req.method === 'GET') {
            if (!permissions.some(p => (p.name === `view_${access}`) || (p.name === `edit_${access}`))) {
                res.status(401).send({ message: 'unauthorized :(' });
                return;
            }
        } else {
            if (!permissions.some(p => (p.name === `edit_${access}`))) {
                res.status(401).send({ message: 'unauthorized :(' });
                return;
            }
        }

        next();
    }
}