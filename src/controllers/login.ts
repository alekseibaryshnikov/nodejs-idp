import { Body, Controller, Post } from "@nestjs/common";
import { Credentials } from "src/entities/credentials";
import { createConnection } from "typeorm";

@Controller('login')
export class Login {
    @Post()
    async login(@Body() body: any): Promise<boolean> {
        const connection = await createConnection();
        const user: Credentials = await connection.getRepository(Credentials).findOne({ where: { login: body.login, password: body.password } });
        connection.close();

        return user ? user.password === body.password : false;
    }
}