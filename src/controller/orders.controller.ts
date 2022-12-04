import { Request, Response } from "express"
import { Parser } from "json2csv";
import { dataSource } from "../data-source";
import { OrderItem } from "../entity/order-item.entity";
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


export async function Export(req: Request, res: Response) {

    const parser = new Parser({
        fields: ['ID', 'Name', 'Email', 'Product Title', 'Price', 'Quantity']
    });


    const orders = await orderRepository.find({
        relations: { order_items: true }
    });

    let json: any[] = [];

    orders.forEach((order: Order) => {
        json.push({
            ID: order.id,
            Name: order.name,
            Email: order.email,
            'Product Title': '',
            Price: '',
            Quantity: ''
        });

        order.order_items.forEach((orderItem: OrderItem) => {
            json.push({
                ID: '',
                Name: '',
                Email: '',
                'Product Title': orderItem.product_title,
                Price: orderItem.price,
                Quantity: orderItem.quantity
            });
        });
    });

    const csv = parser.parse(json);

    res.header('Content-Type', 'text/csv');
    res.attachment('orders.csv');
    res.send(csv);
}


export async function Chart(req: Request, res: Response) {
    const result = await dataSource.query(`
    SELECT STRFTIME('%Y-%m-%d', o.created_at) as date, SUM(oi.price * oi.quantity) as sum
    FROM \'order\'  o 
    JOIN order_item oi on o.id = oi.order_id
    GROUP BY date;
    `)

    res.send(result);
}