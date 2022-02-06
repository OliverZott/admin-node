import { Request, Response } from 'express';
import { LoginValidation, RegisterValidation } from "../validation/register.validation";
import { getManager } from "typeorm";
import { User } from "../entity/user.entity";
import bcryptjs from "bcryptjs";
import { sign, verify } from "jsonwebtoken";
// TODO - Refactor controller-endpoints


export const Register = async (req: Request, res: Response) => {

    /** Validate request and password */
    const body = req.body;
    const { error } = RegisterValidation.validate(body);                    // "express-validation" packages

    if (error) {
        return res.status(400).send(error.details);
    }

    if (body.password !== body.password_confirm) {
        return res.status(400).send({
            message: "Password confirmation must be the same."
        });
    }

    /** Create user */
    const repository = getManager().getRepository(User);                    // "typeorm" package

    const { password, ...user } = await repository.save({
        first_name: body.first_name,
        last_name: body.last_name,
        email: body.email,
        password: await bcryptjs.hash(body.password, 10),                   // "bcryptjs" package
    });

    res.send(user);
}


export const Login = async (req: Request, res: Response) => {

    const repository = getManager().getRepository(User);


    /** Validate request */
    const { error } = LoginValidation.validate(req.body);                   // "express-validation" packages

    if (error) {
        return res.status(400).send(error.details);
    }


    /** Check user and password */
    const user = await repository.findOne({ email: req.body.email });

    if (!user) {
        return res.status(404).send({
            // better also "Invalid credentials"
            message: "User not found."
        });
    }
    if (!await bcryptjs.compare(req.body.password, user.password)) {        // "bcryptjs" package
        return res.status(400).send({
            message: "Invalid credentials."
        });
    }


    /** Generate & send JWT */                                              // "jsonwebtoken" package
    const token = sign({ id: user.id }, process.env.SECRET_KEY as string)

    res.cookie('jwt', token, {
        httpOnly: true,     // only backend can use this cookie
        maxAge: 24 * 60 * 60 * 1000,
    });


    /** Send response */
    res.send({
        message: 'success',
    });
}


export const AuthenticatedUser = async (req: Request, res: Response) => {

    const user = req.body.user;
    res.send({
        user: user.first_name + ' ' + user.last_name,
        email: user.email,
    });
}


export const Logout = async (req: Request, res: Response) => {

    // remove cookie by setting it to be passed
    res.cookie('jwt', '', { maxAge: 0 })

    res.send({ message: "Successfully signed out" })

}
