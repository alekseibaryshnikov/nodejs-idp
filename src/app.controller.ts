import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AuthoriztionRequest } from './models/requests/AuthorizationRequest';
import { OIDCService } from './services/oidc';

@Controller('authorize')
export class AppController {
  constructor(private readonly oidcService: OIDCService) {}

  @Get()
  getAuthCodeByGet(@Query('client_id') client_id: string): string {
    return JSON.stringify(this.oidcService.getAuthCode(client_id));
  }

  @Post()
  getAuthCodeByPost(@Body() body: AuthoriztionRequest) {
    return JSON.stringify(this.oidcService.getAuthCode(body.client_id));
  }
}
