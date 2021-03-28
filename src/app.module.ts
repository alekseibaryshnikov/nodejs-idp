import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OAuthRequestMiddleware } from './middleware/OAuthRequestMiddleware';
import { OIDCService } from './services/oidc';
import { json, urlencoded } from 'body-parser';
import { OIDCRequestMiddleware } from './middleware/OIDCRequestMiddleware';
import { Login } from './controllers/login';

@Module({
  imports: [],
  controllers: [AppController, Login],
  providers: [AppService, OIDCService],
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
