import { Injectable } from "@nestjs/common";
import { Credentials } from "src/entities/credentials";
import { UserCredentialsRequest } from "src/models/requests/UserCredentialsRequest";
import { Connection, createConnection } from "typeorm";

@Injectable()
export class UserService {

    /**
     * Find user by user login and password.
     * Return result of finding.
     * 
     * @param body UserCredentialsRequest
     * @returns boolean
     */
    public async checkCredentials(body: UserCredentialsRequest): Promise<boolean> {
        let connection: Connection;
        
        try {
            connection = await createConnection();
            const user: Credentials = await connection.getRepository(Credentials).findOne({ where: { login: body.login, password: body.password } });
            
            return user ? user.password === body.password : false;
        } catch (err) {
            console.error('Error when trying to fetch data from a db. ', err);
        } finally {
            connection && connection.close();
        }
    }
}