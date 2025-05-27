import { Body, Controller, Param, Put, UsePipes } from '@nestjs/common';

import { UpdateGroupsService } from './update-groups.service';
import { GenericDtoValidatorPipe } from 'src/core/middlewares/pipes/generic-dto-validator.pipe';
import { UuidValidatorPipe } from 'src/core/middlewares/pipes/uuid-validator.pipe';
import { reponsesDTO } from 'src/core/utils/interfaces/responses';
import { GroupOutputDto } from '../interfaces/dtos/outputs.dto';
import { UpdateGroupDto } from '../interfaces/dtos/update-group.dto';
import { UpdateGroupPresenter } from '../interfaces/presenters/groups.presenters';
import { Groups } from '../group.entity';

@Controller('groups')
export class UpdateGroupsController {
  constructor(private readonly _updateGroupsService: UpdateGroupsService) {}

  @Put(':id')
  @UsePipes(new GenericDtoValidatorPipe<UpdateGroupDto>())
  async updateOneGroup(
    @Param('id', UuidValidatorPipe) id: string,
    @Body() data: UpdateGroupDto,
  ): Promise<reponsesDTO<GroupOutputDto>> {
    let response: reponsesDTO<GroupOutputDto>;

    const responseGroup: reponsesDTO<Groups> =
      await this._updateGroupsService.UpdateOne(id, data);
    const statusCode = responseGroup.statusCode;
    const message = responseGroup.message;

    if (responseGroup.data) {
      let userPresenter: UpdateGroupPresenter = new UpdateGroupPresenter();
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
}
