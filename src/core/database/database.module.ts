import { Module } from '@nestjs/common';
import { PrismaService } from './prisma-db/prisma.service';
import { PrismaDBConfig } from './prisma-db/prisma-config';

@Module({
  providers: [PrismaService, PrismaDBConfig],
  exports: [PrismaService, PrismaDBConfig],
})
export class DatabaseModule {}
