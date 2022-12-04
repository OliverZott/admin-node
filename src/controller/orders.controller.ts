import { Request, Response } from "express"
import { dataSource } from "../data-source";
import { Order } from "../entity/order.entity";


const orderRepository = dataSource.getRepository(Order);


export async function GetAllOrders(req: Request, res: Response) {
    const pageSize = 5;
    const page = parseInt(req.query.page as string || "1");

    try {

        const [orders, total] = await orderRepository.findAndCount({
            order: {
                created_at: "DESC"
            },
            skip: (page - 1) * pageSize,
            take: pageSize,
            relations: { order_items: true }
        });

        res.send({
            data: orders.map((order: Order) => ({
                id: order.id,
                email: order.email,
                name: order.name,  // entity-function called and used as a property
                total: order.total,  // entity-function called and used as a property
                created_at: order.created_at,
                order_items: order.order_items
            })),
            meta: {
                total,
                page,
                last_page: Math.ceil(total / pageSize)
            }
        });

    } catch (error) {
        console.log(error)
    }

}


export async function GetOrder(req: Request, res: Response) {
    const order = await orderRepository.findOne({
        where: { id: parseInt(req.params.id) },
        relations: { order_items: true }
    })

    res.send(order)
}

