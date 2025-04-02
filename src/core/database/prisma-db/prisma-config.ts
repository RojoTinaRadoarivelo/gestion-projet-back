import { PrismaClient } from '@prisma/client';
import { AbstractDatabase } from 'src/core/utils/interfaces/database';

export class PrismaDBConfig implements AbstractDatabase {
  protected dbConnection: PrismaClient = null;
  constructor() {
    if (this.dbConnection == null) this.dbConnection = new PrismaClient();
    else this.dbConnection = this.dbConnection;
  }
  connect() {
    return this.dbConnection.$connect();
  }
  disconnect() {
    return this.dbConnection.$disconnect();
  }
  getInstance() {
    return this.dbConnection;
  }
}
