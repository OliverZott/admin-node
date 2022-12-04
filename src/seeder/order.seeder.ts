import { randomInt } from "crypto";
import { createConnection, getManager } from "typeorm";
import { dataSource } from "../data-source";
import { OrderItem } from "../entity/order-item.entity";
import { Order } from "../entity/order.entity";

export async function seed() {
    await dataSource.initialize();
    const orderRepository = dataSource.getRepository(Order);
    const orderItemRepository = dataSource.getRepository(OrderItem);

    for (let i = 0; i < 12; i++) {

        // Dummy timestamp
        const timestamp = Math.floor(Math.random() * Date.now());
        const dummyDate = new Date(timestamp);

        const order = await orderRepository.save({
            first_name: `firstname-${i}`,
            last_name: `lastname-${i}`,
            email: `email-${i}@mail.com`,
            created_at: dummyDate.toString()
        })

        for (let j = 0; j < randomInt(1, 5); j++) {
            const response = await orderItemRepository.save({
                order,
                product_title: `order-item-title-${i * randomInt(2, 100)}`,
                price: randomInt(10, 100),
                quantity: randomInt(1, 8)
            })
        }
    };

    process.exit(0);
};

seed()