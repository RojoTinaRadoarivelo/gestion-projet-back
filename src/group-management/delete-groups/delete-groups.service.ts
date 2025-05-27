import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { Groups } from '../group.entity';
import { verifyObject } from 'src/core/utils/class-validation.util';
import { reponsesDTO } from 'src/core/utils/interfaces/responses';
import { GroupRepository } from '../interfaces/groups.repository';

@Injectable()
export class DeleteGroupsService {
  constructor(private readonly _groupRepository: GroupRepository) {}

  async DeleteOne(id: string): Promise<reponsesDTO<Groups>> {
    let response: reponsesDTO<Groups>;
    try {
      const updatedgroup = await this._groupRepository.DeleteOne(id, null, {
        method: 'prisma',
      });
      if (verifyObject<Groups>(updatedgroup, Groups)) {
        response = {
          statusCode: HttpStatus.OK,
          message: 'Group was deleted successfully.',
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
