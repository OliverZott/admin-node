import { Request, Response } from 'express';
import { getManager, Repository } from "typeorm"
import { User } from "../entity/user.entity";
import bcryptjs from "bcryptjs";

/**
 * API endpoints which can be used by ADMIN and has access to various user.
 */


export const CreateUser = async (req: Request, res: Response) => {
    const { role_id, user, ...body } = req.body;
    const hashedPassword = await bcryptjs.hash("pw", 10);

    const repository = getManager().getRepository(User);

    try {
        const { password, ...newUser } = await repository.save({
            ...body,
            password: hashedPassword
        })
        res.status(201).send(newUser);
    } catch (e) {
        res.send(e);
    }
}


export const Users = async (req: Request, res: Response) => {
    const repository = getManager().getRepository(User);

    const users = await repository.find();

    res.send(users.map(user => {
        const { password, ...data } = user;
        return data;
    }));

}


export const GetUser = async (req: Request, res: Response) => {
    const repository = getManager().getRepository(User);
    const user = await repository.findOne(req.params.id);

    if (user) {
        const { password, ...userData } = user;
        res.send(userData);
    } else {
        res.send(`No user with id=${req.params.id} found!`)
    }
}


export const UpdateUser = async (req: Request, res: Response) => {
    const { role_id, user, ...body } = req.body;
    const repository = getManager().getRepository(User);

    if (await userExists(repository, parseInt(req.params.id))) {
        const updateResult = await repository.update(req.params.id, body);
        res.send("User updated")
    } else {
        res.status(202).send(`No user with id=${req.params.id} found!`)
    }
}


export const DeleteUser = async (req: Request, res: Response) => {
    const repository = getManager().getRepository(User);

    await repository.delete(req.params.id);

    // Not checking if user exists
    res.status(204).send(null)
}


const userExists = async (repository: Repository<User>, id: number): Promise<boolean> => {
    const possibleUser = await repository.findOne(id);
    if (possibleUser !== undefined) { return true }
    return false;
}