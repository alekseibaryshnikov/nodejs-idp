import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { OAuthRequestMiddleware } from './middleware/OAuthRequest.middleware';
import { OIDCService } from './services/oidc';
import { json, urlencoded } from 'body-parser';
import { OIDCRequestMiddleware } from './middleware/OIDCRequest.middleware';
import { LoginController } from './controllers/login.controller';
import { UserService } from './services/user.service';
import { SettingsService } from './services/settings/settings.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './controllers/user.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      keepConnectionAlive: true,
    })
  ],
  controllers: [LoginController, UserController],
  providers: [OIDCService, UserService, SettingsService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        json(),
        urlencoded({ extended: true })
      ).forRoutes({ path: '*', method: RequestMethod.POST })
      .apply(
        OIDCRequestMiddleware,
        OAuthRequestMiddleware).forRoutes('authorize');
  }
}
