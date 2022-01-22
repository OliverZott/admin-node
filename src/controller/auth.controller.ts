import {Request, Response} from 'express';
import {LoginValidation, RegisterValidation} from "../validation/register.validation";
import {getManager} from "typeorm";
import {User} from "../entity/user.entity";
import bcryptjs from "bcryptjs";
import {sign} from "jsonwebtoken";


export const Register = async (req: Request, res: Response) => {
    // TODO - Refactor

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
    const {password, ...user} = await repository.save({
        first_name: body.first_name,
        last_name: body.last_name,
        email: body.email,
        password: await bcryptjs.hash(body.password, 10),
    });

    res.send(user);     // response is the request body
}

export const Login = async (req: Request, res: Response) => {
    // TODO
    //  - Refactor and create private sub-functions
    //  -

    const repository = getManager().getRepository(User);
    const {error} = LoginValidation.validate(req.body);

    if (error) {
        return res.status(400).send(error.details);
    }

    const user = await repository.findOne({email: req.body.email});


    // -----------------------------------------------------------------
    // check user and password
    if (!user) {
        return res.status(404).send({
            message: "User not found."      // better also user "Invalid credentials."!
        });
    }
    if (!await bcryptjs.compare(req.body.password, user.password)) {
        return res.status(400).send({
            message: "Invalid credentials."
        });
    }


    // -----------------------------------------------------------------
    // Generate & send JWT
    const token = sign(
        {id: user.id},
        'secret'
    )

    res.cookie('jwt', token, {
        httpOnly: true,     // only backend can use this cookie
        maxAge: 24 * 60 * 60 * 1000,
    });

    // -----------------------------------------------------------------
    // Response
    res.send({
        message: 'success',
    });
}


export const AuthenticatedUser = async (req: Request, res: Response) => {
    const jwt = req.cookies['jwt'];

    res.send(jwt);
}