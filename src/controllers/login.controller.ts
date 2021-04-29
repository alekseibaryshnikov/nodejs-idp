import { Body, Controller, Get, Post, Render, Res } from "@nestjs/common";
import { Response } from "express";
import { UserCredentialsRequest } from "src/models/requests/UserCredentialsRequest.model";
import { UserService } from "src/services/user.service";

@Controller('login')
export class LoginController {
    constructor(private userService: UserService) { }
    private errorMessage: string;

    @Get()
    @Render('login/loginForm')
    loginForm() {
        return {
            appTitle: 'IDP',
            loginLabel: 'Login',
            passwordLabel: 'Password',
            submitLabel: 'Submit',
            errorMessage: this.errorMessage
        };
    }

    @Post()
    async login(@Res() res: Response, @Body() body: UserCredentialsRequest): Promise<void | Response<JSON, Record<string, any>>> {
        try {
            this.errorMessage = undefined;
            return res.json(JSON.stringify(await this.userService.checkCredentialsAndReturnUser(body)))
        } catch (err) {
            this.errorMessage = err || 'Error when checking user credentials.';
            return res.redirect(301, '/login');
        }
    }
}