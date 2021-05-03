import { Body, Controller, Post, Res } from "@nestjs/common";
import { Response } from "express";
import { Credentials } from "src/entities/credentials.entity";
import { UserInfo } from "src/entities/userInfo.entity";
import { CreateUserRequest } from "src/models/requests/CreateUserRequest.model";
import { UserService } from "src/services/user.service";
import { getConnection } from "typeorm";

@Controller('user')
export class UserController {
  constructor(private userService: UserService) { }

  @Post()
  async createUser(@Res() res: Response, @Body() body: CreateUserRequest): Promise<UserInfo> {
    if (this.checkUserInDB(body)) {
      res.status(400).send('User with these email, mobile phone or login already exists.');
    }

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
    user.blocked = false;

    return getConnection().getRepository(UserInfo).save(user);
  }

  /**
   * Search matches in email, login, mobilePhone in DB
   * 
   * @param userReq CreateUserRequest
   * @returns exist or not
   */
  private async checkUserInDB(userReq: CreateUserRequest): Promise<boolean> {
    const userRepo = getConnection().getRepository(UserInfo);
    const result = await userRepo.find({
      where: [
        { email: userReq.email },
        { mobilePhone: userReq.mobilePhone },
        { credentials: { login: userReq.login } }
      ]
    });

    return result.length > 0;
  }
}