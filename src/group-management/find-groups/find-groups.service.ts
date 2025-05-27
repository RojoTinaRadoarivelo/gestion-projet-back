import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import { verifyObject } from 'src/core/utils/class-validation.util';
import { reponsesDTO } from 'src/core/utils/interfaces/responses';
import { Groups } from '../group.entity';
import { GroupRepository } from '../interfaces/groups.repository';

@Injectable()
export class FindGroupsService {
  constructor(private readonly _groupRepository: GroupRepository) {}

  async findAll(): Promise<reponsesDTO<Groups[]>> {
    let response: reponsesDTO<Groups[]>;
    try {
      const listGroup = await this._groupRepository.FindAll(
        null,
        { orderBy: { createdAt: 'desc' } },
        {
          method: 'prisma',
        },
      );

      if (
        listGroup &&
        Array.isArray(listGroup) &&
        listGroup.every((item) => item instanceof Groups)
      ) {
        response = {
          statusCode: HttpStatus.OK,
          message: 'List of group.',
          data: listGroup,
        };
        return response;
      } else {
        throw listGroup;
      }
    } catch (error) {
      if (error instanceof BadRequestException) {
        response = {
          statusCode: HttpStatus.BAD_REQUEST,
          message: error.message,
        };
      } else if (error instanceof InternalServerErrorException) {
        response = {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message,
        };
      }
      return response;
    }
  }

  async findOne(
    id: string,
    showDetail?: boolean,
  ): Promise<reponsesDTO<Groups>> {
    let response: reponsesDTO<Groups>;
    try {
      const group: Groups | HttpException = await this._groupRepository.FindOne(
        id,
        showDetail ?? false,
        null,
        { orderBy: { createdAt: 'asc' } },
        {
          method: 'prisma',
        },
      );

      if (group && verifyObject<Groups>(group, Groups)) {
        response = {
          statusCode: HttpStatus.OK,
          message: 'Information about the group.',
          data: group,
        };
        return response;
      } else {
        throw group;
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        response = {
          statusCode: HttpStatus.NOT_FOUND,
          message: error.message,
        };
      } else if (error instanceof BadRequestException) {
        response = {
          statusCode: HttpStatus.BAD_REQUEST,
          message: error.message,
        };
      } else {
        response = {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message,
        };
      }

      return response;
    }
  }

  async findOneBy(
    params: any,
    showDetail: boolean = false,
  ): Promise<reponsesDTO<Groups>> {
    let response: reponsesDTO<Groups>;
    try {
      const group: Groups | HttpException = await this._groupRepository.FindOne(
        null,
        showDetail,
        params,
        { orderBy: { createdAt: 'asc' } },
        {
          method: 'prisma',
        },
      );

      if (group && verifyObject<Groups>(group, Groups)) {
        response = {
          statusCode: HttpStatus.OK,
          message: 'Information about the group.',
          data: group,
        };
        return response;
      } else {
        throw group;
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        response = {
          statusCode: HttpStatus.NOT_FOUND,
          message: error.message,
        };
      } else if (error instanceof BadRequestException) {
        response = {
          statusCode: HttpStatus.BAD_REQUEST,
          message: error.message,
        };
      } else {
        response = {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message,
        };
      }

      return response;
    }
  }
}
