import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CONFIG } from './configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [CONFIG],
      cache: true,
    }),
  ],
  exports: [ConfigModule],
})
export class ConfigurationModule {}
