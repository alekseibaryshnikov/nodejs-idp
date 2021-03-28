import { Controller, Get, Query } from '@nestjs/common';
import { OIDCService } from './services/oidc';

@Controller('authorize')
export class AppController {
  constructor(private readonly oidcService: OIDCService) {}

  @Get()
  getAuthCode(@Query('client_id') client_id: string): string {
    return JSON.stringify(this.oidcService.getAuthCode(client_id));
  }
}
