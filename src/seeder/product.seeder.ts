
import { createConnection, getManager } from "typeorm";
import { Product } from "../entity/product.entity";


createConnection().then(async connection => {
    console.log("Seeding products to the database.")
    const repository = dataSource.getRepository(Product);

    const maxPrice = 50;
    const minPrice = 1;

    for (let i = 0; i < 30; i++) {
        await repository.save({
            title: `title-${i}`,
            description: `description-${i}`,
            image: `image${i}`,
            price: (Math.random() * (maxPrice - minPrice) + minPrice),
        })
    };


    process.exit(0);
});
