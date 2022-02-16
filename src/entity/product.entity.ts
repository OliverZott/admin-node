import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {


    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({ nullable: true })
    description: string;

    @Column({ nullable: true })
    image: string;

    @Column()
    price: number;
}