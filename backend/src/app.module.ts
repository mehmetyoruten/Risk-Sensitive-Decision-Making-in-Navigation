import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SessionsModule } from './sessions/sessions.module';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [SessionsModule, ConfigModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
