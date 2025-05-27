import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { CreateGroupsService } from './create-groups.service';
import { GenericDtoValidatorPipe } from 'src/core/middlewares/pipes/generic-dto-validator.pipe';
import { reponsesDTO } from 'src/core/utils/interfaces/responses';
import { CreateGroupDto } from '../interfaces/dtos/create-group.dto';
import { CreateGroupOutputDto } from '../interfaces/dtos/outputs.dto';
import { CreateGroupPresenter } from '../interfaces/presenters/groups.presenters';
import { Groups } from '../group.entity';

@Controller('groups')
export class CreateGroupsController {
  constructor(private readonly _createGroupsService: CreateGroupsService) {}

  @Post()
  @UsePipes(new GenericDtoValidatorPipe<CreateGroupDto>(['create']))
  async CreateGroup(
    @Body() data: CreateGroupDto,
  ): Promise<reponsesDTO<CreateGroupOutputDto>> {
    let response: reponsesDTO<CreateGroupOutputDto>;

    const responseGroup: reponsesDTO<Groups> =
      await this._createGroupsService.CreateGroup(data);
    const statusCode = responseGroup.statusCode;
    const message = responseGroup.message;

    if (responseGroup.data) {
      let groupPresenter: CreateGroupPresenter = new CreateGroupPresenter();
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
