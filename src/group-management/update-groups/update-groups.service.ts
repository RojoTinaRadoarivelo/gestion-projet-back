import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { GroupRepository } from '../interfaces/groups.repository';
import { UpdateGroupDto } from '../interfaces/dtos/update-group.dto';
import { verifyObject } from 'src/core/utils/class-validation.util';
import { reponsesDTO } from 'src/core/utils/interfaces/responses';
import { Groups } from '../group.entity';

@Injectable()
export class UpdateGroupsService {
  constructor(private readonly _groupRepository: GroupRepository) {}

  async UpdateOne(
    id: string,
    data: UpdateGroupDto,
  ): Promise<reponsesDTO<Groups>> {
    let response: reponsesDTO<Groups>;
    try {
      const updatedgroup = await this._groupRepository.Update(
        id,
        false,
        data,
        null,
        {
          method: 'prisma',
        },
      );
      if (verifyObject<Groups>(updatedgroup, Groups)) {
        response = {
          statusCode: HttpStatus.OK,
          message: 'Group was updated successfully.',
          data: updatedgroup,
        };
        return response;
      } else {
        throw updatedgroup;
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

  async UpdateOneBy(
    data: UpdateGroupDto,
    params: any,
  ): Promise<reponsesDTO<Groups>> {
    let response: reponsesDTO<Groups>;
    try {
      const updatedgroup = await this._groupRepository.Update(
        null,
        true,
        data,
        params,
        {
          method: 'prisma',
        },
      );
      if (verifyObject<Groups>(updatedgroup, Groups)) {
        response = {
          statusCode: HttpStatus.OK,
          message: 'Group was updated successfully.',
          data: updatedgroup,
        };
        return response;
      } else {
        throw updatedgroup;
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
