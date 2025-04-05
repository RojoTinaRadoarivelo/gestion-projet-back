import { Repository } from 'src/core/utils/interfaces/repositories';
import { CreateUserDto } from './interfaces/dtos/create-user.dto';
import { UpdateUserDto } from './interfaces/dtos/update-user.dto';
import { Users } from './users.entity';
import { PrismaService } from 'src/core/database/prisma-db/prisma.service';
import { Injectable } from '@nestjs/common';
import { StatusUserDto } from './interfaces/dtos/status-user.dto';
import { HttpExceptionUtil } from 'src/core/utils/http-exception.util';
import { ComparePasswords } from 'src/core/utils/interfaces/pwd-encryption';

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
      this.selectFields = {
        id: true,
        email: true,
        userName: true,
        avatar: true,
        isBlocked: true,
        createdAt: true,
        updatedAt: true,
      };
      const users = await this.usersPrisma.findMany({
        select: this.selectFields,
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
    id: string | null,
    showDetail: boolean = false,
    params?: any,
    options?: {
      orderBy: any;
      paginationIndex?: number;
      paginationLimit?: number;
    },
  ): Promise<Users> {
    try {
      let searchOptions: any = {};
      let pwdToTest: string = '';
      if (params && id == null) {
        searchOptions = params;
        if (searchOptions.password) {
          pwdToTest = searchOptions.password;
          delete searchOptions.password;
        }
      } else {
        searchOptions = { id };
      }
      this.selectFields = {
        email: true,
        userName: true,
        avatar: true,
        createdAt: true,
        updatedAt: true,
      };
      if (showDetail) {
        this.selectFields = {
          id: true,
          email: true,
          password: true,
          userName: true,
          avatar: true,
          createdAt: true,
          updatedAt: true,
        };
      }

      const users: Users = await this.usersPrisma.findFirst({
        where: searchOptions,
        select: this.selectFields,
      });

      const passwordMatch =
        pwdToTest && users
          ? await ComparePasswords(pwdToTest, users.password)
          : false;

      if (!users) HttpExceptionUtil.notfound(`User not found`);

      if (showDetail && !passwordMatch) {
        HttpExceptionUtil.badRequest(`Email or password are incorrect.`);
      }

      const usersResult: Users = new Users(users);
      return usersResult;
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

          this.selectFields = {
            id: true,
            email: true,
            userName: true,
            avatar: true,
            createdAt: true,
          };
          const savingUser = await prisma.users.create({
            data,
            select: this.selectFields,
          });
          if (savingUser) {
            const newUser: Users = new Users(savingUser);
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
            this.selectFields = {
              email: true,
              userName: true,
              avatar: true,
              isBlocked: true,
              updatedAt: true,
            };
            const updateUser = await prisma.users.update({
              where: { id },
              data,
              select: this.selectFields,
            });
            if (updateUser) {
              const result: Users = new Users(updateUser);
              return result;
            }
          }
          HttpExceptionUtil.notfound(`User not found with the id: ${id}`);
        });
    } catch (error) {
      return error;
    }
  }
  async Update(
    id: string,
    showDetail: boolean,
    data: UpdateUserDto,
    params?: any,
  ): Promise<Users> {
    try {
      return await this._dbService
        .getDBInstance()
        .$transaction(async (prisma) => {
          let searchOptions: any = {};
          if (params && showDetail) {
            searchOptions = params;
          } else {
            searchOptions = { id };
          }
          const searchUser = await prisma.users.findFirst({
            where: searchOptions,
          });

          if (searchUser) {
            this.selectFields = {
              id: true,
              email: true,
              userName: true,
              avatar: true,
              createdAt: true,
              updatedAt: true,
            };
            const updateUser = await prisma.users.update({
              where: { id: searchUser.id },
              data,
              select: this.selectFields,
            });
            if (updateUser) {
              const result: Users = new Users(updateUser);
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
