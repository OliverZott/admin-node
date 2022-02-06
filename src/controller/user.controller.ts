import { Request, Response } from 'express';
import { getManager } from "typeorm"
import { User } from "../entity/user.entity";
import bcryptjs from "bcryptjs";




/**
 * API endpoints which can be used by ADMIN and has access to various user.
 */
export const Users = async (req: Request, res: Response) => {
    const repository = getManager().getRepository(User);

    const users = await repository.find();

    res.send(users.map(user => {
        // const outUser = [{
        //     first_name: user.first_name,
        //     last_name: user.last_name,
        //     email: user.email,
        // }]
        // return outUser

        // better:
        const { password, ...data } = user;
        return data;
    }));

}


export const CreateUser = async (req: Request, res: Response) => {
    const { role_id, user, ...body } = req.body;
    const hashedPassword = await bcryptjs.hash("pw", 10);

    const repository = getManager().getRepository(User);
    const { password, ...newUser } = await repository.save({
        ...body,
        password: hashedPassword
    })

    res.send(newUser);
}