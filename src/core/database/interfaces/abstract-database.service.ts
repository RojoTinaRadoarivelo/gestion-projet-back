import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { AbstractDatabase } from 'src/core/utils/interfaces/database';

@Injectable()
export class AbstractDatabaseService implements OnModuleInit, OnModuleDestroy {
  constructor(protected _dbService: AbstractDatabase) {}

  getDBInstance() {
    return this._dbService.getInstance();
  }

  async onModuleInit() {
    this._dbService.connect();
  }
  async onModuleDestroy() {
    await this._dbService.disconnect();
  }
}
