import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from '../interfaces/users.repository';
import { Users } from '../users.entity';
import { reponsesDTO } from 'src/core/utils/interfaces/responses';
import { verifyObject } from 'src/core/utils/class-validation.util';

@Injectable()
export class FindUsersService {
  constructor(private readonly _userRepository: UserRepository) {}

  async findAll(): Promise<reponsesDTO<Users[]>> {
    let response: reponsesDTO<Users[]>;
    try {
      const listUser = await this._userRepository.FindAll(
        null,
        { orderBy: { createdAt: 'desc' } },
        {
          method: 'prisma',
        },
      );

      if (
        listUser &&
        Array.isArray(listUser) &&
        listUser.every((item) => item instanceof Users)
      ) {
        response = {
          statusCode: HttpStatus.OK,
          message: 'List of user.',
          data: listUser,
        };
        return response;
      } else {
        throw listUser;
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

  async findOne(id: string, showDetail?: boolean): Promise<reponsesDTO<Users>> {
    let response: reponsesDTO<Users>;
    try {
      const user: Users | HttpException = await this._userRepository.FindOne(
        id,
        showDetail ?? false,
        null,
        { orderBy: { createdAt: 'asc' } },
        {
          method: 'prisma',
        },
      );

      if (user && verifyObject<Users>(user, Users)) {
        response = {
          statusCode: HttpStatus.OK,
          message: 'Information about the user.',
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

  async findOneBy(params: any): Promise<reponsesDTO<Users>> {
    let response: reponsesDTO<Users>;
    try {
      const user: Users | HttpException = await this._userRepository.FindOne(
        null,
        true,
        params,
        { orderBy: { createdAt: 'asc' } },
        {
          method: 'prisma',
        },
      );

      if (user && verifyObject<Users>(user, Users)) {
        response = {
          statusCode: HttpStatus.OK,
          message: 'Information about the user.',
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
