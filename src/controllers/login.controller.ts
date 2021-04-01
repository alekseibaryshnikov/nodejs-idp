import { Body, Controller, Post } from "@nestjs/common";
import { UserCredentialsRequest } from "src/models/requests/UserCredentialsRequest.model";
import { UserService } from "src/services/user.service";

@Controller('login')
export class LoginController {
    constructor(private userService: UserService) {}

    @Post()
    async login(@Body() body: UserCredentialsRequest): Promise<boolean> {
        try {
            return await this.userService.checkCredentials(body);
        } catch (err) {
            console.error('Error when checking user credentials. ' + err)
        }
    }
}