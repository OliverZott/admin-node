import { randomInt } from "crypto";
import { createConnection, getManager } from "typeorm";
import { OrderItem } from "../entity/order-item.entity";
import { Order } from "../entity/order.entity";

// typeorm Bug!! Not working woth datasource
createConnection().then(async connection => {
    console.log("Seeding Orders to the database...")
    const orderRepository = getManager().getRepository(Order);
    const orderItemRepository = getManager().getRepository(OrderItem);
    // export async function seed() {
    //     await dataSource.initialize();
    //     const orderRepository = dataSource.getRepository(Order);
    //     const orderItemRepository = dataSource.getRepository(OrderItem);

    for (let i = 0; i < 4; i++) {
        const order = await orderRepository.save({
            first_name: `order-title-${i}`,
            last_name: `order-description-${i}`,
            email: `email-${i}@mail.com`,
        })

        for (let j = 0; j < randomInt(1, 5); j++) {
            const response = await orderItemRepository.save({
                order,
                product_title: `order-item-title-${i}`,
                price: randomInt(10, 100),
                quantity: randomInt(1, 8)
            })
        }
    };


    process.exit(0);
    // };
});

// seed()