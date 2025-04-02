import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from '../interfaces/users.repository';
import { StatusUserDto } from '../interfaces/dtos/status-user.dto';
import { verifyObject } from 'src/core/utils/class-validation.util';
import { reponsesDTO } from 'src/core/utils/interfaces/responses';
import { Users } from '../users.entity';

@Injectable()
export class BlockUserService {
  constructor(private readonly _userRepository: UserRepository) {}

  async blockingUser(
    id: string,
    data: StatusUserDto,
  ): Promise<reponsesDTO<Users>> {
    let response: reponsesDTO<Users>;
    try {
      const user = await this._userRepository.UpdateStatus(id, data, null, {
        method: 'prisma',
      });
      if (verifyObject<Users>(user, Users)) {
        response = {
          statusCode: HttpStatus.OK,
          message: 'User was de/blocked successfully.',
          data: user,
        };
        return response;
      } else {
        throw user;
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
