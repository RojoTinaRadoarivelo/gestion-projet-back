import { Controller, Delete, Param } from '@nestjs/common';
import { DeleteGroupsService } from './delete-groups.service';
import { UuidValidatorPipe } from 'src/core/middlewares/pipes/uuid-validator.pipe';
import { reponsesDTO } from 'src/core/utils/interfaces/responses';
import { Groups } from '../group.entity';
import { FindOneGroupPresenter } from '../interfaces/presenters/groups.presenters';
import { GroupOutputDto } from '../interfaces/dtos/outputs.dto';

@Controller('groups')
export class DeleteGroupsController {
  constructor(private readonly _deleteGroupsService: DeleteGroupsService) {}

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
