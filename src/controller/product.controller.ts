import { Request, Response } from 'express';
import { Repository } from "typeorm"
import { dataSource } from '../data-source';
import { Product } from '../entity/product.entity';


export const Products = async (req: Request, res: Response) => {
    const take = 15;
    const page = parseInt(req.query.page as string || "1");


    const repository = dataSource.getRepository(Product);
    const [products, total] = await repository.findAndCount({
        skip: (page - 1) * take,
        take: take,
    });

    res.send({
        data: products,
        meta: {
            total: total,
            page,
            last_page: Math.ceil(total / take),
        }
    });
}


export const GetProduct = async (req: Request, res: Response) => {
    const repository = dataSource.getRepository(Product);
    // const product = await repository.findOne(req.params.id);
    const product = await repository.findOneBy({ id: parseInt(req.params.id) });

    res.send(product ? product : `No product with id=${req.params.id}`);
}


export const CreateProduct = async (req: Request, res: Response) => {
    const repository = dataSource.getRepository(Product);

    try {
        const { user, ...product } = await repository.save(req.body);
        res.send(product);
    } catch (e) {
        res.send(e);
    }
}


export const UpdateProduct = async (req: Request, res: Response) => {
    const { user, ...body } = req.body;
    const repository = dataSource.getRepository(Product);

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
    const repository = dataSource.getRepository(Product);

    await repository.delete(req.params.id);

    // Not checking if user exists
    res.status(204).send(null)
}



const productExists = async (repository: Repository<Product>, id: number): Promise<boolean> => {
    // const prod = await repository.findOne(id);
    const prod = await repository.findOneBy({ id: id });
    if (prod !== undefined) { return true }
    return false;
}