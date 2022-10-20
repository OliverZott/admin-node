import { Request, Response } from 'express';
import { dataSource } from '../data-source';
import { Permission } from '../entity/permission.entity';


export const GetPermissions = async (req: Request, res: Response) => {
    const repository = dataSource.getRepository(Permission);

    res.send(await repository.find());
}