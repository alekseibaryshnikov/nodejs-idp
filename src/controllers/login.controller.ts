import { Body, Controller, Get, Post, Redirect, Render, Res } from "@nestjs/common";
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
    async login(@Res() res: Response, @Body() body: UserCredentialsRequest): Promise<boolean | void> {
        try {
            this.errorMessage = undefined;
            return await this.userService.checkCredentials(body);
        } catch (err) {
            this.errorMessage = 'Error when checking user credentials.';
            return res.redirect(301, '/login');
        }
    }
}