import { MigrationInterface, QueryRunner, Table } from "typeorm";
import { TableColumnOptions } from "typeorm/schema-builder/options/TableColumnOptions";

export class InitSchema1620247751198 implements MigrationInterface {
    private SCHEMA_NAME = 'nodejsidp';

    private ID: TableColumnOptions = {
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        isUnique: true,
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()'
    }

    private tables: Table[] = [];

    constructor() {
        this.tables.push(
            new Table({
                name: `${this.SCHEMA_NAME}.clients`,
                columns: [
                    this.ID,
                    {
                        name: 'clientId',
                        type: 'varchar',
                        isUnique: true
                    },
                    {
                        name: 'clientSecret',
                        type: 'varchar'
                    }
                ]
            }));

        this.tables.push(
            new Table({
                name: `${this.SCHEMA_NAME}.credentials`,
                columns: [
                    this.ID,
                    {
                        name: 'login',
                        type: 'varchar',
                        isUnique: true
                    },
                    {
                        name: 'password',
                        type: 'varchar'
                    }
                ]
            }));

        this.tables.push(
            new Table({
                name: `${this.SCHEMA_NAME}.scopes`,
                columns: [
                    this.ID,
                    {
                        name: 'name',
                        type: 'varchar',
                        isUnique: true
                    }
                ]
            }));

        this.tables.push(
            new Table({
                name: `${this.SCHEMA_NAME}.settings`,
                columns: [
                    this.ID,
                    {
                        name: 'name',
                        type: 'varchar',
                        isUnique: true
                    },
                    {
                        name: 'value',
                        type: 'varchar'
                    },
                    {
                        name: 'type',
                        type: 'varchar'
                    }
                ]
            }));

        this.tables.push(
            new Table({
                name: `${this.SCHEMA_NAME}.user_info`,
                columns: [
                    this.ID,
                    {
                        name: 'name',
                        type: 'varchar',
                        isUnique: true
                    },
                    {
                        name: 'surname',
                        type: 'varchar'
                    },
                    {
                        name: 'patronymic',
                        type: 'varchar'
                    },
                    {
                        name: 'email',
                        type: 'varchar'
                    },
                    {
                        name: 'mobilePhone',
                        type: 'int'
                    },
                    {
                        name: 'blocked',
                        type: 'boolean'
                    }
                ]
            }));
    }

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

        await queryRunner.createSchema(`${this.SCHEMA_NAME}`, true);

        this.tables.forEach(async table => await queryRunner.createTable(table, true));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const iterator = this.tables[Symbol.iterator]();

        const batch = setInterval(async () => {
            const table = iterator.next();
            if (table && table instanceof Table) {
                await queryRunner.dropTable(table, true, true, true);
            } else {
                clearInterval(batch);
            }
        }, 500);

        await queryRunner.dropSchema(this.SCHEMA_NAME, true, true);
    }
}
