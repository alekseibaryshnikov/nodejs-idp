import { Injectable } from "@nestjs/common";
import { Credentials } from "src/entities/credentials.entity";
import { UserCredentialsRequest } from "src/models/requests/UserCredentialsRequest.model";
import { Connection, getConnection } from "typeorm";
import { SettingsService } from "./settings/settings.service";
import * as crypto from 'crypto';
import { UserInfo } from "src/entities/userInfo.entity";

@Injectable()
export class UserService {
    constructor(private settingsService: SettingsService) { }

    /**
     * Find user by user login and password.
     * Return result of finding.
     * 
     * @param body UserCredentialsRequest
     * @returns boolean
     */
    public async checkCredentialsAndReturnUser(body: UserCredentialsRequest): Promise<UserInfo> {
        let connection: Connection;

        try {
            connection = getConnection();
            const saltedPassword: string = await this.saltAndHashPassword(body.password);
            const credentials: Credentials = await connection.getRepository(Credentials)
                .findOne({ where: { login: body.login, password: saltedPassword } });

            if (credentials) {
                return connection.getRepository(UserInfo)
                    .findOne({ where: { credentials } })
            }

            return Promise.reject('Incorrect login or password');
        } catch (err) {
            console.error('Error when trying to fetch data from a db. ', err);
            return Promise.reject();
        }
    }

    /**
     * Salt and hash password. Convert it to base64 after.
     * 
     * @param password
     * @returns base64 string
     */
    public async saltAndHashPassword(password: string): Promise<string> {
        const salt: string = await this.settingsService.getSettings(SettingsService.settings.SALT);
        return crypto.createHash('SHA256').update(password + salt).digest('base64');
    }

}