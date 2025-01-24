import { Request, RequestHandler, Response } from 'express';
import { LoginValidation, RegisterValidation } from "../validation/register.validation";
import { User } from "../entity/user.entity";
import bcryptjs from "bcryptjs";
import { sign, verify } from "jsonwebtoken";
import { dataSource } from '../data-source';
// TODO - Refactor controller-endpoints


/**
 * 
 * API endpoints which can be used by an authenticated user.
 * 
 * @param req 
 * @param res 
 * @returns 
 */
export const Register = async (req: Request, res: Response): Promise<void> => {
    const body = req.body;
    const { error } = RegisterValidation.validate(body);

    if (error) {
        res.status(400).send(error.details);
    }

    if (body.password !== body.password_confirm) {
        res.status(400).send({
            message: "Password confirmation must be the same."
        });
    }

    const repository = dataSource.getRepository(User);

    const { password, ...user } = await repository.save({
        first_name: body.first_name,
        last_name: body.last_name,
        email: body.email,
        password: await bcryptjs.hash(body.password, 10),
    });

    res.status(201).send(user);
};


export const Login = async (req: Request, res: Response): Promise<void> => {
    const repository = dataSource.getRepository(User);

    /** Validate request */
    const { error } = LoginValidation.validate(req.body);                   // "express-validation" packages

    if (error) {
        res.status(400).send(error.details);
    }


    /** Check user and password */
    const user = await repository.findOne({ where: { email: req.body.email } });

    if (!user) {
        res.status(404).send({
            // better also "Invalid credentials"
            message: "User not found."
        });
    }
    if (user && !await bcryptjs.compare(req.body.password, user.password)) {        // "bcryptjs" package
        res.status(400).send({
            message: "Invalid credentials."
        });
        return;
    }


    /** Generate & send JWT */                                              // "jsonwebtoken" package
    const token = sign({ id: user?.id }, process.env.SECRET_KEY as string)

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
    const { password, ...user } = req.body.user;
    res.send(user);
}


export const Logout = async (req: Request, res: Response) => {

    // remove cookie by setting it to be passed
    res.cookie('jwt', '', { maxAge: 0 })
    res.send({ message: "Successfully signed out" })
}


export const UpdateInfo = async (req: Request, res: Response) => {
    const { user, ...data } = req.body;
    const repository = dataSource.getRepository(User);


    await repository.update(user.id, data)
    const updatedUser = await repository.findOne({
        where: { id: parseInt(user.id) }
    });

    res.send({
        // user: updatedUser!.first_name + ' ' + updatedUser!.last_name,
        first_name: updatedUser!.first_name,
        last_name: updatedUser!.last_name,
        email: updatedUser!.email,
    })

}


export const UpdatePassword = async (req: Request, res: Response): Promise<void> => {
    const user: User = req.body.user;

    if (req.body.password !== req.body.password_confirm) {
        res.status(400).send({
            message: "Password confirmation must be the same."
        });
    }

    const repository = dataSource.getRepository(User);
    await repository.update(user.id, {
        password: await bcryptjs.hash(req.body.password, 10)
    })

    res.send({
        message: "Password updated sucessfully"
    })
}