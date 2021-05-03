import { Body, Controller, Get, Post, Query, Render, Res } from "@nestjs/common";
import { Response } from "express";
import { UserInfo } from "src/entities/userInfo.entity";
import { UserCredentialsRequest } from "src/models/requests/UserCredentialsRequest.model";
import { ErrorSerivce } from "src/services/errors/errors.service";
import { RedisService } from "src/services/redis/redis.service";
import { UserService } from "src/services/user.service";
import { v4 } from 'uuid'

@Controller('auth')
export class AuthController {
    constructor(private userService: UserService, private redisService: RedisService, private errorService: ErrorSerivce) { }
    private errorMessage: string;

    @Get()
    @Render('login/loginForm')
    loginForm(@Query('error') error: string) {
        this.errorMessage = this.errorService.getErrorMessage(error);
        
        return {
            appTitle: 'IDP',
            loginLabel: 'Login',
            passwordLabel: 'Password',
            submitLabel: 'Submit',
            errorMessage: this.errorMessage
        };
    }

    @Post()
    async login(
        @Res() res: Response,
        @Body() body: UserCredentialsRequest,
        @Query('redirect_uri') redirect_uri: string,
        @Query('scope') scope: string,
        @Query('state') state: string): Promise<{ code: string } | void> {
        try {
            // Unset if exist error message
            this.errorMessage = undefined;

            const userInfo: UserInfo = await this.userService.checkCredentialsAndReturnUser(body);

            if (this.checkUser(userInfo)) { 
                let code = (await this.redisService.getAuthcode(userInfo.id)).key;

                if (!code) {
                    code = v4();

                    this.redisService.setAuthcode({
                        key: code,
                        value: userInfo.id
                    });
                }

                if (redirect_uri) {
                    res.redirect(`${redirect_uri}?code=${code}&state=${state}`)
                } else {
                    res.send({ code });
                }
            } else {
                this.errorMessage = 'Sorry! Incorrect user name or password.'
                return res.redirect(301, '/auth');
            }
        } catch (err) {
            this.errorMessage = err || 'Error when checking user credentials.';
            return res.redirect(301, '/auth');
        }
    }

    /**
     * Check userInfo and is he blocked?
     * 
     * @param userInfo UserInfo 
     * @returns 
     */
    private checkUser(userInfo: UserInfo): boolean {
        if (!userInfo) {
            return false;
        }

        if (userInfo.blocked) {
            return false;
        }

        return true;
    }
}