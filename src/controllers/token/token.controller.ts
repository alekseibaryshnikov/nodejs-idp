import { Controller, Get, Query, Res } from "@nestjs/common";
import { Response } from 'express';

@Controller('auth')
export class TokenController {
  @Get()
  exchangeAuthCode(
    @Res() res: Response, 
    @Query('code') code: string,
    @Query('grant_type') grant_type: string,
    @Query('redirect_uri') redirect_uri: string,
    @Query('client_id') client_id: string) {
      
  }
}