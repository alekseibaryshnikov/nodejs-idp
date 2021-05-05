import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Credentials } from "./credentials.entity";

@Entity({schema: 'nodejsidp'})
export class UserInfo extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    surname: string;

    @Column()
    patronymic: string;

    @Column()
    email: string;

    @Column()
    mobilePhone: number;

    @Column()
    blocked: boolean

    @OneToOne(() => Credentials, credentials => credentials.id, {
        cascade: true
    })
    @JoinColumn()
    credentials: Credentials
}