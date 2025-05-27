import { Injectable } from '@nestjs/common';

import { Repository } from 'src/core/utils/interfaces/repositories';
import { PrismaService } from 'src/core/database/prisma-db/prisma.service';
import { HttpExceptionUtil } from 'src/core/utils/http-exception.util';
import { Groups } from './group.entity';
import { CreateGroupDto } from './interfaces/dtos/create-group.dto';
import { UpdateGroupDto } from './interfaces/dtos/update-group.dto';

@Injectable()
export class PrismaGroupRepository
  implements Repository<CreateGroupDto, UpdateGroupDto, Groups>
{
  private groupsPrisma: any;
  private selectFields: any = {
    id: true,
    name: true,
    admin: true,
    createdAt: true,
    updatedAt: true,
  };
  constructor(private readonly _dbService: PrismaService) {
    this.groupsPrisma = _dbService.getDBInstance().groups;
  }
  async FindAll(
    params?: any,
    options?: {
      orderBy: any;
      paginationIndex?: number;
      paginationLimit?: number;
    },
  ): Promise<Groups[]> {
    try {
      const Groups = await this.groupsPrisma.findMany({
        select: this.selectFields,
        orderBy: options.orderBy,
      });
      if (Groups) {
        let GroupsResult: Groups[] = [];
        Groups.forEach((el: any) => {
          let GroupElement = new Groups(el);
          GroupsResult.push(GroupElement);
        });

        return GroupsResult;
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
  ): Promise<Groups> {
    try {
      let searchOptions: any = {};
      let pwdToTest: string = '';
      if (params && id == null) {
        searchOptions = params;
      } else {
        searchOptions = { id };
      }
      if (showDetail) {
        this.selectFields = {
          id: true,
          name: true,
          admin: true,
          projects: true,
          createdAt: true,
          updatedAt: true,
        };
      }

      const groups: Groups = await this.groupsPrisma.findFirst({
        where: searchOptions,
        select: this.selectFields,
      });

      if (!groups) HttpExceptionUtil.notfound(`Group not found`);

      const groupsResult: Groups = new Groups(groups);
      return groupsResult;
    } catch (error) {
      return error;
    }
  }
  async Create(data: CreateGroupDto, params?: any): Promise<Groups> {
    try {
      return await this._dbService
        .getDBInstance()
        .$transaction(async (prisma) => {
          const searchGroup = await prisma.groups.findFirst({
            where: { name: data.name },
            select: { name: true },
          });
          if (searchGroup) {
            HttpExceptionUtil.conflict(
              `Group with the name: ${data.name} already exist`,
            );
          }

          const savingGroup = await prisma.groups.create({
            data,
            select: this.selectFields,
          });
          if (savingGroup) {
            const newGroup: Groups = new Groups(savingGroup);
            return newGroup;
          }
        });
    } catch (error) {
      return error;
    }
  }
  async CreateMany(data: CreateGroupDto[], params?: any): Promise<Groups[]> {
    throw new Error('Method not implemented.');
  }
  async Update(
    id: string,
    showDetail: boolean,
    data: UpdateGroupDto,
    params?: any,
  ): Promise<Groups> {
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
          const searchGroup = await prisma.groups.findFirst({
            where: searchOptions,
            select: { name: true },
          });

          if (searchGroup) {
            const updateGroup = await prisma.groups.update({
              where: { id: searchGroup.id },
              data,
              select: this.selectFields,
            });
            if (updateGroup) {
              const result: Groups = new Groups(updateGroup);
              return result;
            }
          }
          HttpExceptionUtil.notfound(`Group not found with the id: ${id}`);
        });
    } catch (error) {
      return error;
    }
  }
  async UpdateMany(data: UpdateGroupDto[], params?: any): Promise<Groups[]> {
    throw new Error('Method not implemented.');
  }
  async DeleteOne(id: string, params?: any): Promise<Groups> {
    try {
      return await this._dbService
        .getDBInstance()
        .$transaction(async (prisma) => {
          let searchOptions: any = {};
          if (params) {
            searchOptions = params;
          } else {
            searchOptions = { id };
          }
          const searchGroup = await prisma.groups.findFirst({
            where: searchOptions,
          });

          if (searchGroup) {
            const deleteGroup = await prisma.groups.deleteFirst({
              where: { id: searchGroup.id },
            });
            if (deleteGroup) {
              const result: Groups = new Groups(searchGroup);
              return result;
            }
          }
          HttpExceptionUtil.notfound(`Group not found with the id: ${id}`);
        });
    } catch (error) {
      return error;
    }
  }
  async DeleteAll(params?: any): Promise<Groups[]> {
    throw new Error('Method not implemented.');
  }
}
