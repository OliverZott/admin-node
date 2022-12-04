import { DataSource } from "typeorm";
import { OrderItem } from "./entity/order-item.entity";
import { Order } from "./entity/order.entity";
import { Permission } from "./entity/permission.entity";
import { Product } from "./entity/product.entity";
import { Role } from "./entity/role.entity";
import { User } from "./entity/user.entity";

export const dataSource = new DataSource({
    type: "sqlite",
    database: 'src/data/node_admin.db',
    synchronize: true,
    logging: true,
    entities: [User, Role, Permission, Product, Order, OrderItem],
    subscribers: [],
    migrations: [],
})


// dataSource.initialize()
//     .then(() => {
//         console.log("Data Source has been initialized!")
//     })
//     .catch((err) => {
//         console.error("Error during Data Source initialization", err)
//     })