import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma-db/prisma.service';

@Injectable()
export class SessionsService {
  private userSessionsPrisma: any;
  private selectFields: any = {
    id: true,
    token: true,
    user: {
      select: {
        id: true,
        email: true,
      },
    },
    createdAt: true,
    updatedAt: true,
  };
  constructor(private readonly _dbService: PrismaService) {
    this.userSessionsPrisma = _dbService.getDBInstance().userSessions;
  }
  async UpdateSession(id: String, token: string) {
    await this.userSessionsPrisma.update({
      where: { id },
      data: { token },
      select: this.selectFields,
    });
    return id;
  }

  async UpdateDetailedSession(id: String, token: string) {
    const updatedSession = await this.userSessionsPrisma.update({
      where: { id },
      data: { token },
      select: this.selectFields,
    });
    return updatedSession;
  }

  async CreateSession(user_id: string) {
    const newSessionUser = await this.userSessionsPrisma.create({
      data: { user: { connect: { id: user_id } } },
      select: this.selectFields,
    });
    return newSessionUser.id;
  }

  async searchSessionByUser(id: string): Promise<string | null> {
    const sessionUser = await this.userSessionsPrisma.findFirst({
      where: {
        user_id: id,
      },
      select: this.selectFields,
    });
    if (sessionUser) {
      return sessionUser.id;
    }
    return null;
  }

  async searchSessionById(id: string): Promise<string | null> {
    const sessionUser = await this.userSessionsPrisma.findFirst({
      where: {
        id,
      },
      select: this.selectFields,
    });
    if (sessionUser) {
      return sessionUser.id;
    }
    return null;
  }
}
