import { Body, Controller, Get, Post, Render } from "@nestjs/common";
import { UserCredentialsRequest } from "src/models/requests/UserCredentialsRequest.model";
import { UserService } from "src/services/user.service";

@Controller('login')
export class LoginController {
    constructor(private userService: UserService) {}

    @Get()
    @Render('login/loginForm')
    loginForm() {
        return {
            appTitle: 'IDP',
            loginLabel: 'Login',
            passwordLabel: 'Password',
            submitLabel: 'Submit'
        };
    }

    @Post()
    async login(@Body() body: UserCredentialsRequest): Promise<boolean> {
        try {
            return await this.userService.checkCredentials(body);
        } catch (err) {
            console.error('Error when checking user credentials. ' + err)
        }
    }
}