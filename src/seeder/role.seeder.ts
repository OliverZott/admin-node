import { createConnection, getManager } from "typeorm";
import { Permission } from "../entity/permission.entity";


createConnection().then(async connection => {
    console.log("Seeding user role-permission to the database.")

    const permissionRepository = getManager().getRepository(Permission);

    const permissions = [
        'view_users',
        'edit_users',
        'view_roles',
        'edit_roles',
        'view_products',
        'edit_products',
        'view_orders',
        'edit_orders',];


    for (let i = 0; i < permissions.length; i++) {
        await permissionRepository.save({
            name: permissions[i]
        })
    }

    process.exit(0);
});
