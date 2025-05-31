import { Controller, Get, Param } from '@nestjs/common';

import { FindGroupsService } from './find-groups.service';
import { Groups } from '../group.entity';
import { UuidValidatorPipe } from 'src/core/middlewares/pipes/uuid-validator.pipe';
import { reponsesDTO } from 'src/core/utils/interfaces/responses';
import {
  GroupOutputDto,
  GroupsOutputDto,
} from '../interfaces/dtos/outputs.dto';
import {
  FindOneGroupPresenter,
  FindAllGroupPresenter,
} from '../interfaces/presenters/groups.presenters';

@Controller('groups')
export class FindGroupsController {
  constructor(private readonly _findGroupsService: FindGroupsService) {}

  @Get(':id')
  async FindOneGroup(
    @Param('id', UuidValidatorPipe) id: string,
  ): Promise<reponsesDTO<GroupOutputDto>> {
    let response: reponsesDTO<GroupOutputDto>;

    const responseGroup: reponsesDTO<Groups> =
      await this._findGroupsService.findOne(id);
    const statusCode = responseGroup.statusCode;
    const message = responseGroup.message;

    if (responseGroup.data) {
      let userPresenter: FindOneGroupPresenter = new FindOneGroupPresenter();
      const dataResponse = userPresenter.present(responseGroup.data);
      response = {
        statusCode,
        message,
        data: dataResponse,
      };
    } else {
      response = { statusCode, message };
    }

    return response;
  }

  @Get()
  async FindAllGroup(): Promise<reponsesDTO<GroupsOutputDto[]>> {
    let response: reponsesDTO<GroupsOutputDto[]>;

    const responseGroups: reponsesDTO<Groups[]> =
      await this._findGroupsService.findAll();

    const statusCode = responseGroups.statusCode;
    const message = responseGroups.message;

    if (responseGroups.data) {
      let userPresenter: FindAllGroupPresenter = new FindAllGroupPresenter();
      const dataResponse = userPresenter.present(responseGroups.data);
      response = {
        statusCode,
        message,
        data: dataResponse,
      };
    } else {
      response = { statusCode, message };
    }

    return response;
  }
}
