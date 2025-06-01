import { Presenter } from 'src/core/utils/interfaces/presenters';
import { dateToString } from 'src/core/utils/dates.util';
import { isArray } from 'class-validator';
import { Groups } from 'src/group-management/group.entity';
import {
  AssignationOutputDto,
  CreateGroupOutputDto,
  GroupOutputDto,
  GroupsOutputDto,
  UserAssignationOutputDto,
} from '../dtos/outputs.dto';
import { UserAssignation } from 'src/group-management/assignation.entity';

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
    const members: AssignationOutputDto[] =
      data.UserGroups && data.UserGroups.length
        ? data.UserGroups.map((el) => ({
            id: el.id,
            user: {
              id: el.user?.id,
              email: el.user?.email,
              userName: el.user?.userName ?? '',
            },
            createdAt: dateToString(el?.createdAt),
          }))
        : [];
    if (data instanceof Groups) {
      response = {
        name: data.name,
        createdAt: dateToString(data.createdAt),
        admin: data.admin
          ? data.admin.userName
            ? data.admin.userName
            : data.admin.email
          : '',
        members,
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

// assignation

export class CreateAssignationPresenter
  implements Presenter<UserAssignation, UserAssignationOutputDto>
{
  present(data: UserAssignation, options?: any): UserAssignationOutputDto {
    let response: UserAssignationOutputDto;
    if (data instanceof UserAssignation) {
      response = {
        id: data.id,
        group: {
          id: data.group.id,
          name: data.group.name,
        },
        user: {
          id: data.user.id,
          email: data.user.email,
          userName: data.user.userName ?? '',
        },
        createdAt: dateToString(data.createdAt),
      };
    } else {
      response = null;
    }
    return response;
  }
}

export class UpdateAssignationPresenter
  implements Presenter<UserAssignation, UserAssignationOutputDto>
{
  present(data: UserAssignation, options?: any): UserAssignationOutputDto {
    let response: UserAssignationOutputDto;
    if (data instanceof UserAssignation) {
      response = {
        id: data.id,
        group: {
          id: data.group.id,
          name: data.group.name,
        },
        user: {
          id: data.user.id,
          email: data.user.email,
          userName: data.user.userName ?? '',
        },
        createdAt: dateToString(data.createdAt),
        updatedAt: dateToString(data.updatedAt),
      };
    } else {
      response = null;
    }
    return response;
  }
}

export class DeleteAssignationPresenter
  implements Presenter<UserAssignation, UserAssignationOutputDto>
{
  present(data: UserAssignation, options?: any): UserAssignationOutputDto {
    let response: UserAssignationOutputDto;
    if (data instanceof UserAssignation) {
      response = {
        id: data.id,
        group: {
          id: data.group.id,
          name: data.group.name,
        },
        user: {
          id: data.user.id,
          email: data.user.email,
          userName: data.user.userName ?? '',
        },
      };
    } else {
      response = null;
    }
    return response;
  }
}
