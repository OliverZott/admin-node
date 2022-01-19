import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number | undefined;

    @Column()
    first_name: string | undefined;

    @Column()
    last_name: string | undefined;

    @Column({
        unique: true
    })
    email: string | undefined;

    @Column()
    password: string | undefined;
}