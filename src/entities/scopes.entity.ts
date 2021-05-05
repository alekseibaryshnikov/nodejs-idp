import { BaseEntity, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Clients } from "./clients.entity";
import { UserInfo } from "./userInfo.entity";

@Entity({ schema: 'nodejsidp' })
export class Scopes extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToMany(() => Clients)
  @JoinTable()
  clients: Clients[];

  @ManyToMany(() => UserInfo)
  @JoinTable()
  users: UserInfo[]
}