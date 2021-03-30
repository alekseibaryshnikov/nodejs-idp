import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OAuthRequestMiddleware } from './middleware/OAuthRequestMiddleware';
import { OIDCService } from './services/oidc';
import { json, urlencoded } from 'body-parser';
import { OIDCRequestMiddleware } from './middleware/OIDCRequestMiddleware';
import { LoginController } from './controllers/login.controller';
import { UserService } from './services/user.service';

@Module({
  imports: [],
  controllers: [AppController, LoginController],
  providers: [AppService, OIDCService, UserService],
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
