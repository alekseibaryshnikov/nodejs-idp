import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OAuthRequestMiddleware } from './middleware/OAuthRequestMiddleware';
import { OIDCService } from './services/oidc';
import { json, urlencoded } from 'body-parser';
import { OIDCRequestMiddleware } from './middleware/OIDCRequestMiddleware';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, OIDCService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        json(),
        urlencoded({ extended: true }),
        OIDCRequestMiddleware,
        OAuthRequestMiddleware)
      .forRoutes('authorize');
  }
}
