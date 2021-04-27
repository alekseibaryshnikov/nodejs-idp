import { Injectable } from "@nestjs/common";
import { Credentials } from "src/entities/credentials.entity";
import { UserCredentialsRequest } from "src/models/requests/UserCredentialsRequest.model";
import { Connection, createConnection } from "typeorm";
import { SettingsService } from "./settings/settings.service";
import * as crypto from 'crypto';

@Injectable()
export class UserService {
    private connection: Connection;

    constructor(private settingsService: SettingsService) { }

    /**
     * Find user by user login and password.
     * Return result of finding.
     * 
     * @param body UserCredentialsRequest
     * @returns boolean
     */
    public async checkCredentials(body: UserCredentialsRequest): Promise<boolean> {
        try {
            this.connection = await createConnection();
            const saltedPassword: string = await this.saltAndHashPassword(body.password);
            const user: Credentials = await this.connection.getRepository(Credentials)
                .findOne({ where: { login: body.login, password: saltedPassword } });

            return user ? user.password === body.password : false;
        } catch (err) {
            console.error('Error when trying to fetch data from a db. ', err);
            return Promise.reject();
        } finally {
            this.connection && this.connection.close();
        }
    }

    /**
     * Salt and hash password. Convert it to base64 after.
     * 
     * @param password
     * @returns base64 string
     */
    public async saltAndHashPassword(password: string): Promise<string> {
        const salt: string = await this.settingsService.getSalt();
        return crypto.createHash('SHA256').update(password + salt).digest('base64');
    }

}