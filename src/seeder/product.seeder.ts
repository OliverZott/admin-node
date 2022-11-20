
import { dataSource } from "../data-source";
import { Product } from "../entity/product.entity";


export async function seed() {
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
}
