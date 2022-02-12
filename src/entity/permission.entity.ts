import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

// Todo user enum for permission-types
@Entity()
export class Permission {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
}