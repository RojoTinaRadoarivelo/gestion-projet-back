import { Repository } from 'src/core/utils/interfaces/repositories';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Users } from '../users.entity';
import { PrismaUserRepository } from '../users.prisma-repository';
import { Injectable } from '@nestjs/common';
import { StatusUserDto } from './dtos/status-user.dto';

@Injectable()
export class UserRepository
  implements Repository<CreateUserDto, UpdateUserDto, Users>
{
  constructor(private readonly _prismaUserRepository: PrismaUserRepository) {}
  async FindAll(
    params?: any,
    options?: {
      orderBy: any;
      paginationIndex?: number;
      paginationLimit?: number;
    },
    persistance?: { method: string },
  ): Promise<Users[]> {
    if (persistance.method == 'prisma') {
      return await this._prismaUserRepository.FindAll(params, options);
    }
    throw new Error('Method not implemented.');
  }
  async FindOne(
    id: string,
    params?: any,
    options?: {
      orderBy: any;
      paginationIndex?: number;
      paginationLimit?: number;
    },
    persistance?: { method: string },
  ): Promise<Users> {
    if (persistance.method == 'prisma') {
      return await this._prismaUserRepository.FindOne(id, params, options);
    }
    throw new Error('Method not implemented.');
  }
  async Create(
    data: CreateUserDto,
    params?: any,
    persistance?: { method: string },
  ): Promise<Users> {
    if (persistance.method == 'prisma') {
      return await this._prismaUserRepository.Create(data, params);
    }
    throw new Error('Method not implemented.');
  }
  async CreateMany(data: CreateUserDto[], params?: any): Promise<Users[]> {
    throw new Error('Method not implemented.');
  }
  async UpdateStatus(
    id: string,
    data: StatusUserDto,
    params?: any,
    persistance?: { method: string },
  ): Promise<Users> {
    if (persistance.method == 'prisma') {
      return await this._prismaUserRepository.UpdateStatus(id, data, params);
    }
    throw new Error('Method not implemented.');
  }
  async Update(
    id: string,
    data: UpdateUserDto,
    params?: any,
    persistance?: { method: string },
  ): Promise<Users> {
    if (persistance.method == 'prisma') {
      return await this._prismaUserRepository.Update(id, data, params);
    }
    throw new Error('Method not implemented.');
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
