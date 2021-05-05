import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({schema: 'nodejsidp'})
export class Clients extends BaseEntity{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  cliendId: string;

  @Column()
  secret: string;

  @Column()
  type: string;
}