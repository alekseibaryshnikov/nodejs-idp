import { Controller, Get, Query, Res } from "@nestjs/common";
import { Response } from 'express';
import { Scopes } from "src/entities/scopes.entity";
import { UserInfo } from "src/entities/userInfo.entity";
import { Token, TokenTypes } from "src/models/tokens/token.model";
import { ErrorSerivce, ErrorTypes } from "src/services/errors/errors.service";
import { RedisService } from "src/services/redis/redis.service";
import { SettingsService } from "src/services/settings/settings.service";
import { getRepository } from "typeorm";
import * as crypto from 'crypto';
import { v4 } from 'uuid';

@Controller('token')
export class TokenController {
  constructor(private redisService: RedisService, private errorSerivce: ErrorSerivce, private settingsService: SettingsService) { }

  @Get()
  async exchangeAuthCode(
    @Res() res: Response,
    @Query('code') code: string,
    @Query('grant_type') grant_type: string,
    @Query('redirect_uri') redirect_uri: string,
    @Query('client_id') client_id: string,
    @Query('state') state: string) {
    this.choseFlow(grant_type, res)[grant_type]({code, redirect_uri, client_id, state});
  }

  private choseFlow(grant_type: string, res: Response) {
    return {
      'code': async (queryParams: QueryParams) => {
        if (queryParams.code !== 'code') {
          this.errorSerivce.redirectToAuthPage(res, ErrorTypes.InvalidResponseType);
        }

        if (!queryParams.redirect_uri) {
          this.errorSerivce.redirectToAuthPage(res, ErrorTypes.MissedRedirectUrl);
        }

        await this.checkAuthCode(queryParams.code, res);

        const userInfo = await this.checkUserInfo(queryParams.code, res);
        const token = await this.generateToken(queryParams.client_id, userInfo.id);

        this.redisService.setToken({ key: userInfo.id, value: token });

        res.set({ 'Authorization': `${TokenTypes.BEARER} ${token}` }).redirect(queryParams.redirect_uri);
      },
      'implicit': () => { },
      'client_credentials': () => { }
    }[grant_type];
  }

  private async generateToken(client_id: string, userId: string) {
    const expiraton = ~~await this.settingsService.getSettings(SettingsService.settings.EXPIRATIONS);
    const scopes = await getRepository(Scopes).find({ relations: ['clients', 'userInfo'], where: { id: client_id, users: userId } });

    const token: Token = {
      access_token: await this.saltAndHashToken(),
      token_type: TokenTypes.BEARER,
      expires_in: expiraton,
      refresh_token: await this.saltAndHashToken(),
      scope: this.scopesArrayToString(scopes)
    };

    return btoa(JSON.stringify(token));
  }

  /**
   * Function for generating encrypted tokens
   * 
   * @returns token
   */
  private async saltAndHashToken(): Promise<string> {
    const tokenSalt = await this.settingsService.getSettings(SettingsService.settings.TOKEN_SALT);
    return crypto.createHash('SHA256').update(v4() + tokenSalt + Date.now()).digest('base64');
  }

  /**
   * Check and return UserInfo from the cache
   * 
   * @param authCode 
   * @param res Response
   * @returns UserInfo given from the cache
   */
  private async checkUserInfo(authCode: string, res: Response): Promise<UserInfo> {
    const userInfo = getRepository(UserInfo).findOne({ where: { id: authCode } });

    if (!userInfo) {
      res.redirect(`/auth?&error=${ErrorTypes.UserNotFoundError}`);
    }

    return userInfo;
  }

  /**
   * Check and rteturn AuthCode from the cache
   * 
   * @param code AuthCode
   * @param res Response
   * @returns stringed authcode from the cache
   */
  private async checkAuthCode(code: string, res: Response): Promise<string> {
    const authCode: KeyValue = (await this.redisService.getAuthcode(code));

    if (!authCode) {
      res.redirect(`/auth?&error=${ErrorTypes.InvalidAuthCode}`);
    }

    return authCode.value;
  }

  /**
   * Convert list of scopes to an string 
   * Each scope delimted via space
   * 
   * @param scopes Scopes[]
   * @returns string
   */
  private scopesArrayToString(scopes: Scopes[]): string {
    return scopes.reduce((prev, curr) => {
      prev.push(curr.name);
      return prev;
    }, []).join(' ')
  }
}

interface QueryParams {
  response_type: string,
  client_id: string,
  code?: string,
  grant_type?: string,
  redirect_uri?: string,
  state?: string,
  scope?: string
}