import { createConnection, getManager } from "typeorm";
import { Permission } from "../entity/permission.entity";
import { Role } from "../entity/role.entity";


createConnection().then(async connection => {
    console.log("Seeding user role-permission to the database.")

    const perms_all = ['view_users', 'edit_users', 'view_roles', 'edit_roles', 'view_products', 'edit_products', 'view_orders', 'edit_orders',];
    let permissions: Permission[] = [];

    const permissionRepository = getManager().getRepository(Permission);
    for (let i = 0; i < perms_all.length; i++) {
        permissions.push(await permissionRepository.save({
            name: perms_all[i]
        }));
    };


    const roleRepository = getManager().getRepository(Role);
    await roleRepository.save({
        name: ' Admin',
        // permissions: perms_all as unknown as Permission[],
        permissions: permissions,
    });


    delete permissions[3];
    await roleRepository.save({
        name: ' Editor',
        permissions: permissions,
    });


    delete permissions[1];
    delete permissions[5];
    delete permissions[7];
    await roleRepository.save({
        name: ' Viewer',
        permissions: permissions,
    });


    process.exit(0);
});
