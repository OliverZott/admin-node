import { Request, Response } from 'express';
import { verify } from "jsonwebtoken";
import { getManager } from 'typeorm';
import { User } from '../entity/user.entity';


export const AuthMiddleware = async (req: Request, res: Response, next: Function) => {

    try {
        const jwt = req.cookies['jwt'];

        const payload: any = verify(jwt, process.env.SECRET_KEY as string);

        if (!payload) {
            return res.status(401).send({
                message: 'Not authenticated!'
            });
        }

        const repository = getManager().getRepository(User);

        req.body.user = await repository.findOne(payload.id);
        
        next();
    }
    catch (e) {
        return res.status(401).send({
            message: 'Not authenticated!'
        });
    }
}