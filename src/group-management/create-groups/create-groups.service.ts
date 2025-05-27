import {
  BadRequestException,
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { GroupRepository } from '../interfaces/groups.repository';
import { CreateGroupDto } from '../interfaces/dtos/create-group.dto';
import { verifyObject } from 'src/core/utils/class-validation.util';
import { reponsesDTO } from 'src/core/utils/interfaces/responses';
import { Groups } from '../group.entity';

@Injectable()
export class CreateGroupsService {
  constructor(private readonly _groupRepository: GroupRepository) {}

  async CreateGroup(data: CreateGroupDto): Promise<reponsesDTO<Groups>> {
    let response: reponsesDTO<Groups>;
    try {
      const newGroup: Groups | HttpException =
        await this._groupRepository.Create(data, null, {
          method: 'prisma',
        });

      if (verifyObject<Groups>(newGroup, Groups)) {
        response = {
          statusCode: HttpStatus.CREATED,
          message: 'Group was created successfully.',
          data: newGroup,
        };
        return response;
      } else {
        throw newGroup;
      }
    } catch (error) {
      if (error instanceof ConflictException) {
        response = {
          statusCode: HttpStatus.CONFLICT,
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
