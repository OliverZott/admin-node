import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

// Todo user enum for role-types
@Entity()
export class Role {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany()
}