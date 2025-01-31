import { Request, Response } from 'express';
import { verify } from "jsonwebtoken";
import { getManager } from 'typeorm';
import { dataSource } from '../data-source';
import { User } from '../entity/user.entity';

/** Used so we can work with JWT only */
export const AuthMiddleware = async (req: Request, res: Response, next: Function): Promise<void> => {

    try {
        /** Validate token in cookie */
        const jwt = req.cookies['jwt'];
        const payload: any = verify(jwt, process.env.SECRET_KEY as string);         // "jsonwebtoken" package
        if (!payload) {
            res.status(401).send({
                message: 'Not authenticated!'
            });
        }

        /** Add user to request body (body was empty before) */
        const repository = dataSource.getRepository(User);
        req.body.user = await repository.findOne({
            where: { id: payload.id },
            relations: {
                role: {
                    permissions: true,          // relations of relations
                }

            }
        });
        next();
    }
    catch (e) {
        res.status(401).send({
            message: 'Not authenticated!'
        });
    }
}