import { Request, Response } from 'express';
import { User } from '../entity/user.entity';

export default function PermissionMiddleware(access: string) {
    return (req: Request, res: Response, next: Function) => {
        const user: User = req.body['user'];

        let permissions;

        try {
            permissions = user.role.permissions;
        } catch (error) {
            return res.status(401).send({ message: 'No Permissions! You are unauthorized :(' })
        }

        if (req.method === 'GET') {
            if (!permissions.some(p => (p.name === `view_${access}`) || (p.name === `edit_${access}`))) {
                return res.status(401).send({ message: 'unauthorized :(' })
            }
        } else {
            if (!permissions.some(p => (p.name === `edit_${access}`))) {
                return res.status(401).send({ message: 'unauthorized :(' })
            }
        }

        next();
    }
}