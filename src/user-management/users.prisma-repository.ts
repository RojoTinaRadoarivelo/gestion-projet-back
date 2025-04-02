import { Repository } from 'src/core/utils/interfaces/repositories';
import { CreateUserDto } from './interfaces/dtos/create-user.dto';
import { UpdateUserDto } from './interfaces/dtos/update-user.dto';
import { Users } from './users.entity';
import { PrismaService } from 'src/core/database/prisma-db/prisma.service';
import { Injectable } from '@nestjs/common';
import { StatusUserDto } from './interfaces/dtos/status-user.dto';
import { HttpExceptionUtil } from 'src/core/utils/http-exception.util';

@Injectable()
export class PrismaUserRepository
  implements Repository<CreateUserDto, UpdateUserDto, Users>
{
  private usersPrisma: any;
  private selectFields: any = {};
  constructor(private readonly _dbService: PrismaService) {
    this.usersPrisma = _dbService.getDBInstance().users;
  }
  async FindAll(
    params?: any,
    options?: {
      orderBy: any;
      paginationIndex?: number;
      paginationLimit?: number;
    },
  ): Promise<Users[]> {
    try {
      const users = await this.usersPrisma.findMany({
        include: this.selectFields,
        orderBy: options.orderBy,
      });
      if (users) {
        let usersResult: Users[] = [];
        users.forEach((el) => {
          let userElement = new Users(el);
          usersResult.push(userElement);
        });

        return usersResult;
      }
    } catch (error) {
      return error.message;
    }
  }
  async FindOne(
    id: string,
    params?: any,
    options?: {
      orderBy: any;
      paginationIndex?: number;
      paginationLimit?: number;
    },
  ): Promise<Users> {
    try {
      const users = await this.usersPrisma.findFirst({
        where: { id },
        include: this.selectFields,
        orderBy: options.orderBy,
      });
      if (users) {
        const usersResult: Users = new Users(users);
        return usersResult;
      }
      HttpExceptionUtil.notfound(`User not found with the id: ${id}`);
    } catch (error) {
      return error;
    }
  }
  async Create(data: CreateUserDto, params?: any): Promise<Users> {
    try {
      return await this._dbService
        .getDBInstance()
        .$transaction(async (prisma) => {
          const searchUser = await prisma.users.findFirst({
            where: { email: data.email },
          });
          if (searchUser) {
            HttpExceptionUtil.conflict(
              `User with the email: ${data.email} already exist`,
            );
          }

          const savingUser = await prisma.users.create({
            data,
            include: this.selectFields,
          });
          if (savingUser) {
            const newUser = new Users(savingUser);
            return newUser;
          }
        });
    } catch (error) {
      return error;
    }
  }
  async CreateMany(data: CreateUserDto[], params?: any): Promise<Users[]> {
    throw new Error('Method not implemented.');
  }
  async UpdateStatus(
    id: string,
    data: StatusUserDto,
    params?: any,
  ): Promise<Users> {
    try {
      return await this._dbService
        .getDBInstance()
        .$transaction(async (prisma) => {
          const searchUser = await prisma.users.findFirst({
            where: { id },
          });
          if (searchUser) {
            const updateUser = await prisma.users.update({
              where: { id },
              data,
              include: this.selectFields,
            });
            if (updateUser) {
              const result = new Users(updateUser);
              return result;
            }
          }
          HttpExceptionUtil.notfound(`User not found with the id: ${id}`);
        });
    } catch (error) {
      return error;
    }
  }
  async Update(id: string, data: UpdateUserDto, params?: any): Promise<Users> {
    try {
      return await this._dbService
        .getDBInstance()
        .$transaction(async (prisma) => {
          const searchUser = await prisma.users.findFirst({
            where: { id },
          });
          if (searchUser) {
            const updateUser = await prisma.users.update({
              where: { id },
              data,
              include: this.selectFields,
            });
            if (updateUser) {
              const result = new Users(updateUser);
              return result;
            }
          }
          HttpExceptionUtil.notfound(`User not found with the id: ${id}`);
        });
    } catch (error) {
      return error;
    }
  }
  async UpdateMany(data: UpdateUserDto[], params?: any): Promise<Users[]> {
    throw new Error('Method not implemented.');
  }
  async DeleteOne(id: string, params?: any): Promise<Users> {
    throw new Error('Method not implemented.');
  }
  async DeleteAll(params?: any): Promise<Users[]> {
    throw new Error('Method not implemented.');
  }
}
