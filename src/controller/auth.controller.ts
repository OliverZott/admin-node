import {Request, Response} from 'express';
import {RegisterValidation} from "../validation/register.validation";
import {getManager} from "typeorm";
import {User} from "../entity/user.entity";
import bcryptjs from "bcryptjs";


export const register = async (req: Request, res: Response) => {

    const body = req.body;
    const {error} = RegisterValidation.validate(body);  // deconstruct validation result

    if (error) {
        return res.status(400).send(error.details);
    }

    if (body.password !== body.password_confirm) {
        return res.status(400).send({
            message: "Password confirmation must be the same."
        });
    }

    const repository = getManager().getRepository(User);

    // create user
    const user = await repository.save({
        first_name: body.first_name,
        last_name: body.last_name,
        email: body.email,
        password: await bcryptjs.hash(body.password, 19),
    })

    res.send(body);     // response is the request body
}