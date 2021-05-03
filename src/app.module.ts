import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { OAuthRequestMiddleware } from './middleware/OAuthRequest.middleware';
import { OIDCService } from './services/oidc';
import { json, urlencoded } from 'body-parser';
import { OIDCRequestMiddleware } from './middleware/OIDCRequest.middleware';
import { AuthController } from './controllers/auth/auth.controller';
import { UserService } from './services/user.service';
import { SettingsService } from './services/settings/settings.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './controllers/user.controller';
import { TokenController } from './controllers/token/token.controller';
import { RedisService } from './services/redis/redis.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      keepConnectionAlive: true,
    })
  ],
  controllers: [AuthController, UserController, TokenController],
  providers: [OIDCService, UserService, SettingsService, RedisService],
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
