import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({schema: 'users'})
export class Credentials extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    login: string;

    @Column()
    password: string;

}