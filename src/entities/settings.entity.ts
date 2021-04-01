import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({schema: 'users'})
export class Settings extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column()
    name: string;

    @Column()
    value: string;

    @Column()
    type: string;
}