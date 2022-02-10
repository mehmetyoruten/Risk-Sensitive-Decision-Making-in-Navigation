import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SessionsModule } from './sessions/sessions.module';
import { ConfigModule } from './config/config.module';
import { GridModule } from './grids/grids.module';
import { MoveModule } from './move/move.module';

@Module({
  imports: [SessionsModule, ConfigModule, GridModule, MoveModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
