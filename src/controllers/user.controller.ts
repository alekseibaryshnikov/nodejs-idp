import { Body, Controller, Post } from "@nestjs/common";
import { Credentials } from "src/entities/credentials.entity";
import { UserInfo } from "src/entities/userInfo.entity";
import { CreateUserRequest } from "src/models/requests/CreateUserRequest.model";
import { UserService } from "src/services/user.service";
import { getConnection } from "typeorm";

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async createUser(@Body() body: CreateUserRequest): Promise<UserInfo> {
    // Salt and hash password
    const credentials = new Credentials();
    credentials.password = await this.userService.saltAndHashPassword(body.password);
    credentials.login = body.login;

    // Map CreateUserRequest to UserEntity
    const user: UserInfo = Object.entries(body).reduce((acc, curr) => {
      if (curr[0] !== 'password' && curr[0] !== 'login') {
        acc[curr[0]] = curr[1];
      }

      return acc;
    }, <UserInfo>{});

    user.credentials = credentials;
    return getConnection().getRepository(UserInfo).save(user);
  }
}