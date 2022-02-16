import { Request, Response } from 'express';
import { getManager, Repository } from "typeorm"
import { Product } from '../entity/product.entity';


export const Products = async (req: Request, res: Response) => {
    const repository = getManager().getRepository(Product);
    const products = await repository.find();

    res.send(products);
}


export const GetProduct = async (req: Request, res: Response) => {
    const repository = getManager().getRepository(Product);
    const product = await repository.findOne(req.params.id);

    res.send(product ? product : `No product with id=${req.params.id}`);
}


export const CreateProduct = async (req: Request, res: Response) => {
    const repository = getManager().getRepository(Product);

    try {
        const { user, ...product } = await repository.save(req.body);
        res.send(product);
    } catch (e) {
        res.send(e);
    }
}


export const UpdateProduct = async (req: Request, res: Response) => {
    const { user, ...body } = req.body;
    const repository = getManager().getRepository(Product);

    try {
        await repository.update(req.params.id, {
            ...body
        });
        res.send("Product updated")
    } catch (e) {
        res.send(e)
    }
}


export const DeleteProduct = async (req: Request, res: Response) => {
    const repository = getManager().getRepository(Product);

    await repository.delete(req.params.id);

    // Not checking if user exists
    res.status(204).send(null)
}



const productExists = async (repository: Repository<Product>, id: number): Promise<boolean> => {
    const prod = await repository.findOne(id);
    if (prod !== undefined) { return true }
    return false;
}