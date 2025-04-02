import { Injectable } from '@nestjs/common';
import { PrismaDBConfig } from './prisma-config';
import { AbstractDatabaseService } from '../interfaces/abstract-database.service';

@Injectable()
export class PrismaService extends AbstractDatabaseService {
  constructor(protected readonly prismaConfig: PrismaDBConfig) {
    super(prismaConfig);
  }
}
