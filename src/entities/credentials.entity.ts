import { BaseEntity, Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserInfo } from "./userInfo.entity";

@Entity({schema: 'nodejsidp'})
export class Credentials extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    login: string;

    @Column()
    password: string;

    @OneToOne(() => UserInfo, userInfo => userInfo.id)
    userInfo: UserInfo
}