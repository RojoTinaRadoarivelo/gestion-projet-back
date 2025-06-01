import { Injectable } from '@nestjs/common';

import { Repository } from 'src/core/utils/interfaces/repositories';
import { Groups } from '../group.entity';
import { CreateGroupDto } from './dtos/create-group.dto';
import { UpdateGroupDto } from './dtos/update-group.dto';
import { PrismaGroupRepository } from '../group.prisma-repository';
import {
  CreateAssignationDto,
  UpdateAssignationDto,
} from './dtos/assignation.dto';
import { UserAssignation } from '../assignation.entity';

@Injectable()
export class GroupRepository
  implements Repository<CreateGroupDto, UpdateGroupDto, Groups>
{
  constructor(private readonly _prismaGroupRepository: PrismaGroupRepository) {}
  async FindAll(
    params?: any,
    options?: {
      orderBy: any;
      paginationIndex?: number;
      paginationLimit?: number;
    },
    persistance?: { method: string },
  ): Promise<Groups[]> {
    if (persistance.method == 'prisma') {
      return await this._prismaGroupRepository.FindAll(params, options);
    }
    throw new Error('Method not implemented.');
  }
  async FindOne(
    id: string | null,
    showDetail: boolean,
    params?: any,
    options?: {
      orderBy: any;
      paginationIndex?: number;
      paginationLimit?: number;
    },
    persistance?: { method: string },
  ): Promise<Groups> {
    if (persistance.method == 'prisma') {
      return await this._prismaGroupRepository.FindOne(
        id,
        showDetail,
        params,
        options,
      );
    }
    throw new Error('Method not implemented.');
  }
  async Create(
    data: CreateGroupDto,
    params?: any,
    persistance?: { method: string },
  ): Promise<Groups> {
    if (persistance.method == 'prisma') {
      return await this._prismaGroupRepository.Create(data, params);
    }
    throw new Error('Method not implemented.');
  }
  async CreateMany(
    data: CreateGroupDto[],
    params?: any,
    persistance?: { method: string },
  ): Promise<Groups[]> {
    throw new Error('Method not implemented.');
  }
  async Update(
    id: string,
    showDetail: boolean,
    data: UpdateGroupDto,
    params?: any,
    persistance?: { method: string },
  ): Promise<Groups> {
    if (persistance.method == 'prisma') {
      return await this._prismaGroupRepository.Update(
        id,
        showDetail,
        data,
        params,
      );
    }
    throw new Error('Method not implemented.');
  }
  async UpdateMany(
    data: UpdateGroupDto[],
    params?: any,
    persistance?: { method: string },
  ): Promise<Groups[]> {
    throw new Error('Method not implemented.');
  }
  async DeleteOne(
    id: string,
    params?: any,
    persistance?: { method: string },
  ): Promise<Groups> {
    if (persistance.method == 'prisma') {
      return await this._prismaGroupRepository.DeleteOne(id, params);
    }
    throw new Error('Method not implemented.');
  }
  async DeleteAll(
    params?: any,
    persistance?: { method: string },
  ): Promise<Groups[]> {
    throw new Error('Method not implemented.');
  }

  async CreateAssigment(
    data: CreateAssignationDto,
    params?: any,
    persistance?: { method: string },
  ) {
    if (persistance.method == 'prisma') {
      return await this._prismaGroupRepository.CreateAssignment(data, params);
    }
    throw new Error('Method not implemented.');
  }
  async UpdateAssigment(
    id: string,
    data: UpdateAssignationDto,
    params?: any,
    persistance?: { method: string },
  ) {
    if (persistance.method == 'prisma') {
      return await this._prismaGroupRepository.UpdateAssignment(
        id,
        data,
        params,
      );
    }
    throw new Error('Method not implemented.');
  }

  async RemoveAssignement(
    id: string,
    params?: any,
    persistance?: { method: string },
  ): Promise<UserAssignation> {
    if (persistance.method == 'prisma') {
      return await this._prismaGroupRepository.RemoveAssignement(id, params);
    }
    throw new Error('Method not implemented.');
  }
}
