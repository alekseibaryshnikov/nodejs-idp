import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({schema: 'nodejsidp'})
export class Settings extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    value: string;

    @Column()
    type: string;
}