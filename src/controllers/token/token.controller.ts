import { Controller, Get, Query, Res } from "@nestjs/common";
import { Response } from 'express';
import { ErrorSerivce } from "src/services/errors/errors.service";
import { RedisService } from "src/services/redis/redis.service";

@Controller('auth')
export class TokenController {
  constructor(private redisService: RedisService, private errorSerivce: ErrorSerivce) {}
  
  @Get()
  async exchangeAuthCode(
    @Res() res: Response, 
    @Query('code') code: string,
    @Query('grant_type') grant_type: string,
    @Query('redirect_uri') redirect_uri: string,
    @Query('client_id') client_id: string) {
      const authCode: KeyValue = (await this.redisService.getAuthcode(code));

      if (!authCode) {
        res.redirect(`/auth?&error=${this.errorSerivce.setInvalidAuthCodeErorr()}`);
      }
  }
}