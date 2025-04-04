import { Presenter } from 'src/core/utils/interfaces/presenters';
import { Users } from 'src/user-management/users.entity';
import {
  CreateUserOutputDto,
  UserOutputDto,
  UsersOutputDto,
} from '../dtos/outputs.dto';
import { dateToString } from 'src/core/utils/dates.util';
import { isArray } from 'class-validator';

export class FindAllUserPresenter
  implements Presenter<Users[], UsersOutputDto[]>
{
  present(data: Users[], options?: any): UsersOutputDto[] {
    let responseList: UsersOutputDto[] = [];
    if (isArray(data) && data.every((el) => el instanceof Users)) {
      data.forEach((el) => {
        responseList.push({
          id: el.id,
          email: el.email,
          createdAt: dateToString(el.createdAt),
          avatar: el.avatar ?? '',
          userName: el.userName ?? '',
        });
      });
      return responseList;
    } else return [];
  }
}

export class FindOneUserPresenter implements Presenter<Users, UserOutputDto> {
  present(data: Users, options?: any): UserOutputDto {
    let response: UserOutputDto;
    if (data instanceof Users) {
      response = {
        email: data.email,
        createdAt: dateToString(data.createdAt),
        avatar: data.avatar ?? '',
        userName: data.userName ?? '',
      };
    } else {
      response = null;
    }
    return response;
  }
}

export class BlockUserPresenter implements Presenter<Users, UserOutputDto> {
  present(data: Users, options?: any): UserOutputDto {
    let response: UserOutputDto;
    if (data instanceof Users) {
      response = {
        email: data.email,
        updatedAt: dateToString(data.updatedAt),
        avatar: data.avatar ?? '',
        userName: data.userName ?? '',
        isBlocked: data.isBlocked,
      };
    } else {
      response = null;
    }
    return response;
  }
}

export class CreateUserPresenter
  implements Presenter<Users, CreateUserOutputDto>
{
  present(data: Users, options?: any): CreateUserOutputDto {
    let user: CreateUserOutputDto;
    if (options && options?.detail) {
      user = {
        email: data.email,
        createdAt: dateToString(data.createdAt),
        userName: data.userName ?? '',
        avatar: data.avatar ?? '',
      };
    } else {
      user = {
        email: data.email,
        createdAt: dateToString(data.createdAt),
      };
    }
    return user;
  }
}

export class UpdateUserPresenter implements Presenter<Users, UserOutputDto> {
  present(data: Users, options?: any): UserOutputDto {
    let response: UserOutputDto;
    if (data instanceof Users) {
      response = {
        email: data.email,
        updatedAt: dateToString(data.updatedAt),
        avatar: data.avatar ?? '',
        userName: data.userName ?? '',
      };
    } else {
      response = null;
    }
    return response;
  }
}
