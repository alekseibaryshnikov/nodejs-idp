import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OAuthRequestMiddleware } from './middleware/OAuthRequestMiddleware';
import { OIDCService } from './services/oidc';
import * as bodyParser from 'body-parser';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, OIDCService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(bodyParser.json(), bodyParser.urlencoded(), OAuthRequestMiddleware).forRoutes('authorize');
  }
}
