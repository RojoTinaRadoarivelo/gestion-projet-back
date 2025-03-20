import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from './core/core.module';
import { AuthModule } from './auth/auth.module';
import { UserManagementModule } from './user-management/user-management.module';

@Module({
  imports: [CoreModule, AuthModule, UserManagementModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
