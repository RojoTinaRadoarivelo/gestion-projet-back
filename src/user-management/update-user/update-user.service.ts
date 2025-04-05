import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from '../interfaces/users.repository';
import { UpdateUserDto } from '../interfaces/dtos/update-user.dto';
import { verifyObject } from 'src/core/utils/class-validation.util';
import { reponsesDTO } from 'src/core/utils/interfaces/responses';
import { Users } from '../users.entity';
import { HashPassword } from 'src/core/utils/interfaces/pwd-encryption';

@Injectable()
export class UpdateUserService {
  constructor(private readonly _userRepository: UserRepository) {}

  async UpdateOne(
    id: string,
    data: UpdateUserDto,
  ): Promise<reponsesDTO<Users>> {
    let response: reponsesDTO<Users>;
    try {
      if (data.password) {
        const hashedPassword = await HashPassword(data.password, 10);
        data.password = hashedPassword;
      }

      const updatedUser = await this._userRepository.Update(
        id,
        false,
        data,
        null,
        {
          method: 'prisma',
        },
      );
      if (verifyObject<Users>(updatedUser, Users)) {
        response = {
          statusCode: HttpStatus.OK,
          message: 'User was updated successfully.',
          data: updatedUser,
        };
        return response;
      } else {
        throw updatedUser;
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
    data: UpdateUserDto,
    params: any,
  ): Promise<reponsesDTO<Users>> {
    let response: reponsesDTO<Users>;
    try {
      const updatedUser = await this._userRepository.Update(
        null,
        true,
        data,
        params,
        {
          method: 'prisma',
        },
      );
      if (verifyObject<Users>(updatedUser, Users)) {
        response = {
          statusCode: HttpStatus.OK,
          message: 'User was updated successfully.',
          data: updatedUser,
        };
        return response;
      } else {
        throw updatedUser;
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
