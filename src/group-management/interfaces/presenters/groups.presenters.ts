import { Presenter } from 'src/core/utils/interfaces/presenters';
import { dateToString } from 'src/core/utils/dates.util';
import { isArray } from 'class-validator';
import { Groups } from 'src/group-management/group.entity';
import {
  CreateGroupOutputDto,
  GroupOutputDto,
  GroupsOutputDto,
} from '../dtos/outputs.dto';

export class FindAllGroupPresenter
  implements Presenter<Groups[], GroupsOutputDto[]>
{
  present(data: Groups[], options?: any): GroupsOutputDto[] {
    let responseList: GroupsOutputDto[] = [];
    if (isArray(data) && data.every((el) => el instanceof Groups)) {
      data.forEach((el) => {
        responseList.push({
          id: el.id,
          name: el.name,
          createdAt: dateToString(el.createdAt),
          admin: el.admin
            ? el.admin.userName
              ? el.admin.userName
              : el.admin.email
            : '',
        });
      });
      return responseList;
    } else return [];
  }
}

export class FindOneGroupPresenter
  implements Presenter<Groups, GroupOutputDto>
{
  present(data: Groups, options?: any): GroupOutputDto {
    let response: GroupOutputDto;
    if (data instanceof Groups) {
      response = {
        name: data.name,
        createdAt: dateToString(data.createdAt),
        admin: data.admin
          ? data.admin.userName
            ? data.admin.userName
            : data.admin.email
          : '',
      };
    } else {
      response = null;
    }
    return response;
  }
}

// has project dto
// export class BlockGroupPresenter implements Presenter<Groups, GroupOutputDto> {
//   present(data: Groups, options?: any): GroupOutputDto {
//     let response: GroupOutputDto;
//     if (data instanceof Groups) {
//       response = {
//         name: data.name,
//         updatedAt: dateToString(data.updatedAt),
//         admin:  data.admin
// ? data.admin.userName
//   ? data.admin.userName
//   : data.admin.email
// : '',
//         GroupName: data.GroupName ?? '',
//         isBlocked: data.isBlocked,
//       };
//     } else {
//       response = null;
//     }
//     return response;
//   }
// }

export class CreateGroupPresenter
  implements Presenter<Groups, CreateGroupOutputDto>
{
  present(data: Groups, options?: any): CreateGroupOutputDto {
    let Group: CreateGroupOutputDto;
    if (options && options?.detail) {
      Group = {
        name: data.name,
        createdAt: dateToString(data.createdAt),
        admin: data.admin
          ? data.admin.userName
            ? data.admin.userName
            : data.admin.email
          : '',
      };
    } else {
      Group = {
        name: data.name,
        createdAt: dateToString(data.createdAt),
      };
    }
    return Group;
  }
}

export class UpdateGroupPresenter implements Presenter<Groups, GroupOutputDto> {
  present(data: Groups, options?: any): GroupOutputDto {
    let response: GroupOutputDto;
    if (data instanceof Groups) {
      response = {
        name: data.name,
        updatedAt: dateToString(data.updatedAt),
        admin: data.admin
          ? data.admin.userName
            ? data.admin.userName
            : data.admin.email
          : '',
      };
    } else {
      response = null;
    }
    return response;
  }
}
