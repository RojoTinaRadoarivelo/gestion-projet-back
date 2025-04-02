import {
  BadRequestException,
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateUserDto } from '../interfaces/dtos/create-user.dto';
import { Users } from '../users.entity';
import { reponsesDTO } from 'src/core/utils/interfaces/responses';
import { UserRepository } from '../interfaces/users.repository';
import { verifyObject } from 'src/core/utils/class-validation.util';
import { HttpExceptionUtil } from 'src/core/utils/http-exception.util';

@Injectable()
export class CreateUserService {
  constructor(private readonly _userRepository: UserRepository) {}

  async CreateUser(data: CreateUserDto): Promise<reponsesDTO<Users>> {
    let response: reponsesDTO<Users>;
    try {
      const newUser: Users | HttpException = await this._userRepository.Create(
        data,
        null,
        {
          method: 'prisma',
        },
      );

      if (verifyObject<Users>(newUser, Users)) {
        response = {
          statusCode: HttpStatus.CREATED,
          message: 'User was created successfully.',
          data: newUser,
        };
        return response;
      } else {
        throw newUser;
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
