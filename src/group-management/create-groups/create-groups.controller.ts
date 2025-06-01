import { Body, Controller, Param, Post, Put, UsePipes } from '@nestjs/common';
import { CreateGroupsService } from './create-groups.service';
import { GenericDtoValidatorPipe } from 'src/core/middlewares/pipes/generic-dto-validator.pipe';
import { reponsesDTO } from 'src/core/utils/interfaces/responses';
import { CreateGroupDto } from '../interfaces/dtos/create-group.dto';
import {
  CreateGroupOutputDto,
  UserAssignationOutputDto,
} from '../interfaces/dtos/outputs.dto';
import {
  CreateAssignationPresenter,
  CreateGroupPresenter,
  UpdateAssignationPresenter,
} from '../interfaces/presenters/groups.presenters';
import { Groups } from '../group.entity';
import { UuidParamValidatorPipe } from 'src/core/middlewares/validators/uuid-param.validator';
import {
  CreateAssignationDto,
  UpdateAssignationDto,
} from '../interfaces/dtos/assignation.dto';
import { UserAssignation } from '../assignation.entity';

@Controller('groups')
export class CreateGroupsController {
  constructor(private readonly _createGroupsService: CreateGroupsService) {}

  @Post('assign')
  @UsePipes(new GenericDtoValidatorPipe<CreateAssignationDto>(['create']))
  async AssignUser(
    @Body() data: CreateAssignationDto,
  ): Promise<reponsesDTO<UserAssignationOutputDto>> {
    let response: reponsesDTO<UserAssignationOutputDto>;

    const responseAssignment: reponsesDTO<UserAssignation> =
      await this._createGroupsService.Assign(data);
    const statusCode = responseAssignment.statusCode;
    const message = responseAssignment.message;

    if (responseAssignment.data) {
      let groupPresenter: CreateAssignationPresenter =
        new CreateAssignationPresenter();
      const dataResponse = groupPresenter.present(responseAssignment.data);
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

  @Put('assign/:id')
  @UsePipes(new GenericDtoValidatorPipe<UpdateAssignationDto>())
  async UpdateAssignment(
    @Param('id', UuidParamValidatorPipe) id: string,
    @Body() data: UpdateAssignationDto,
  ): Promise<reponsesDTO<UserAssignationOutputDto>> {
    let response: reponsesDTO<UserAssignationOutputDto>;

    const responseAssignment: reponsesDTO<UserAssignation> =
      await this._createGroupsService.UpdateAssignment(id, data);
    const statusCode = responseAssignment.statusCode;
    const message = responseAssignment.message;

    if (responseAssignment.data) {
      let groupPresenter: UpdateAssignationPresenter =
        new UpdateAssignationPresenter();
      const dataResponse = groupPresenter.present(responseAssignment.data);
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
