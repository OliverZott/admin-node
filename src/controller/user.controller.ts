import { Request, Response } from 'express';
import { Repository } from "typeorm"
import { User } from "../entity/user.entity";
import bcryptjs from "bcryptjs";
import { dataSource } from '../data-source';

/**
 * API endpoints which can be used by ADMIN and has access to various user.
 */


export const CreateUser = async (req: Request, res: Response) => {
    const { role_id, user, ...body } = req.body;
    const hashedPassword = await bcryptjs.hash("pw", 10);

    const repository = dataSource.getRepository(User);

    try {
        const { password, ...newUser } = await repository.save({
            ...body,
            password: hashedPassword,
            role: {
                id: role_id
            }
        })
        res.status(201).send(newUser);
    } catch (e) {
        res.send(e);
    }
}


export const Users = async (req: Request, res: Response) => {
    const take = 4;
    const page = parseInt(req.query.page as string || "1");

    const repository = dataSource.getRepository(User);

    const [users, total] = await repository.findAndCount({
        take: take,
        skip: (page - 1) * take,
        relations: ['role']
    });

    res.send({
        data: users.map(user => {
            const { password, ...data } = user;
            return data;
        }),
        meta: {
            total: total,
            current_page: page,
            last_page: Math.ceil(total / take),
        }
    })
}


export const GetUser = async (req: Request, res: Response) => {
    const repository = dataSource.getRepository(User);
    const user = await repository.findOne({
        where: { id: parseInt(req.params.id) },
        relations: {
            role: {
                permissions: true
            }
        },
    })

    if (user) {
        const { password, ...userData } = user;
        res.send(userData);
    } else {
        res.send(`No user with id=${req.params.id} found!`)
    }
}


export const UpdateUser = async (req: Request, res: Response) => {
    const { role_id, user, ...body } = req.body;
    const repository = dataSource.getRepository(User);

    try {
        if (await userExists(repository, parseInt(req.params.id))) {
            await repository.update(req.params.id, {
                ...body,
                role: {
                    id: role_id,
                }
            });
            res.send("User updated")
        } else {
            res.status(202).send(`No user with id=${req.params.id} found!`)
        }
    } catch (e) {
        res.send(e)
    }
}


export const DeleteUser = async (req: Request, res: Response) => {
    const repository = dataSource.getRepository(User);

    await repository.delete(req.params.id);

    // Not checking if user exists
    res.status(204).send(null)
}


const userExists = async (repository: Repository<User>, id: number): Promise<boolean> => {
    const possibleUser = await repository.findOneBy({ id: id });
    if (possibleUser !== undefined) { return true }
    return false;
}