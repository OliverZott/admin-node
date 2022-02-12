import { Request, Response } from 'express';
import { getManager } from 'typeorm';
import { Permission } from '../entity/permission.entity';


export const GetPermissions = async (req: Request, res: Response) => {
    const repository = getManager().getRepository(Permission);

    res.send(await repository.find());
}