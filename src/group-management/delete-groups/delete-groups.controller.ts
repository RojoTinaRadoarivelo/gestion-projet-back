import { Controller, Delete, Param } from '@nestjs/common';
import { DeleteGroupsService } from './delete-groups.service';
import { UuidValidatorPipe } from 'src/core/middlewares/pipes/uuid-validator.pipe';
import { reponsesDTO } from 'src/core/utils/interfaces/responses';
import { Groups } from '../group.entity';
import {
  FindOneGroupPresenter,
  DeleteAssignationPresenter,
} from '../interfaces/presenters/groups.presenters';
import {
  GroupOutputDto,
  UserAssignationOutputDto,
} from '../interfaces/dtos/outputs.dto';
import { UserAssignation } from '../assignation.entity';

@Controller('groups')
export class DeleteGroupsController {
  constructor(private readonly _deleteGroupsService: DeleteGroupsService) {}

  @Delete('remove/assignement/:id')
  async RemoveAssignement(
    @Param('id', UuidValidatorPipe) id: string,
  ): Promise<reponsesDTO<UserAssignationOutputDto>> {
    let response: reponsesDTO<UserAssignationOutputDto>;

    const responseGroup: reponsesDTO<UserAssignation> =
      await this._deleteGroupsService.RemoveAssignement(id);
    const statusCode = responseGroup.statusCode;
    const message = responseGroup.message;

    if (responseGroup.data) {
      let groupPresenter: DeleteAssignationPresenter =
        new DeleteAssignationPresenter();
      const dataResponse = groupPresenter.present(responseGroup.data);
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

  @Delete(':id')
  async DeleteGroup(
    @Param('id', UuidValidatorPipe) id: string,
  ): Promise<reponsesDTO<GroupOutputDto>> {
    let response: reponsesDTO<GroupOutputDto>;

    const responseGroup: reponsesDTO<Groups> =
      await this._deleteGroupsService.DeleteOne(id);
    const statusCode = responseGroup.statusCode;
    const message = responseGroup.message;

    if (responseGroup.data) {
      let groupPresenter: FindOneGroupPresenter = new FindOneGroupPresenter();
      const dataResponse = groupPresenter.present(responseGroup.data);
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
