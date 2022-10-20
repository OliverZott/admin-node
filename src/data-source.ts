import { DataSource } from "typeorm";
import { Permission } from "./entity/permission.entity";
import { Product } from "./entity/product.entity";
import { Role } from "./entity/role.entity";
import { User } from "./entity/user.entity";

export const dataSource = new DataSource({
    type: "sqlite",
    database: 'src/data/node_admin.db',
    synchronize: true,
    logging: true,
    entities: [User, Role, Permission, Product],
    subscribers: [],
    migrations: [],
})


