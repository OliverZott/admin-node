import { Request, Response } from 'express';
import { dataSource } from '../data-source';
import { Role } from '../entity/role.entity';


export const GetRoles = async (req: Request, res: Response) => {
    const repository = dataSource.getRepository(Role);

    res.send(await repository.find());
}


export const GetRole = async (req: Request, res: Response) => {
    const repository = dataSource.getRepository(Role);
    // const role = await repository.findOne(req.params.id, { relations: ['permissions'] })
    const role = await repository.findOne({
        where: { id: parseInt(req.params.id) },
        relations: { permissions: true },
    })

    res.send(role);
}


export const CreateRole = async (req: Request, res: Response) => {
    const repository = dataSource.getRepository(Role);
    const { name, permissions }: { name: string, permissions: number[] } = req.body;

    const role = await repository.save({
        name: name,
        permissions: permissions.map(id => {
            return { id: id }
        })
    });

    res.status(201).send(role);
}


// Update is same as CREATE but with passed ID
export const UpdateRole = async (req: Request, res: Response) => {
    const repository = dataSource.getRepository(Role);
    const { name, permissions }: { name: string, permissions: number[] } = req.body;

    const role = await repository.save({
        id: parseInt(req.params.id),
        name: name,
        permissions: permissions.map(id => {
            return { id: id }
        })
    });

    res.status(202).send(role);
}


export const DeleteRole = async (req: Request, res: Response) => {
    const repository = dataSource.getRepository(Role);

    await repository.delete(req.params.id);

    res.status(204).send(null);
}