import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthorizationRequestMiddleware } from './guards/AuthorizationRequestMiddleware';
import { OIDCService } from './services/oidc';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, OIDCService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthorizationRequestMiddleware).forRoutes('authorize');
  }
}
