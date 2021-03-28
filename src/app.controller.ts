import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { OAuthRequest } from './models/requests/OAuthRequest';
import { OIDCService } from './services/oidc';

@Controller('authorize')
export class AppController {
  constructor(private readonly oidcService: OIDCService) {}

  @Get()
  getAuthCodeByGet(@Query() query: OAuthRequest): string {
    return JSON.stringify(this.oidcService.getAuthCode(query.client_id));
  }

  @Post()
  getAuthCodeByPost(@Body() body: OAuthRequest) {
    return JSON.stringify(this.oidcService.getAuthCode(body.client_id));
  }
}
