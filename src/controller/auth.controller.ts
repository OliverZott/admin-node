import {Request, Response} from 'express';
import {RegisterValidation} from "../validation/register.validation";


export const register = (req: Request, res: Response) => {
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

    res.send(body);     // response is the request body
}