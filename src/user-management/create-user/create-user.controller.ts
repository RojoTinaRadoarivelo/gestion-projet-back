import { Body, Controller, Post, UsePipes } from '@nestjs/common';

import { CreateUserService } from './create-user.service';
import { CreateUserDto } from '../interfaces/dtos/create-user.dto';
import { reponsesDTO } from 'src/core/utils/interfaces/responses';
import { CreateUserPresenter } from '../interfaces/presenters/users.presenter';
import { Users } from '../users.entity';
import { CreateUserOutputDto } from '../interfaces/dtos/outputs.dto';
import { GenericDtoValidatorPipe } from 'src/core/middlewares/pipes/generic-dto-validator.pipe';

@Controller('users')
export class CreateUserController {
  constructor(private readonly _createUserService: CreateUserService) {}

  @Post()
  @UsePipes(new GenericDtoValidatorPipe<CreateUserDto>(['create']))
  async CreateUser(
    @Body() data: CreateUserDto,
  ): Promise<reponsesDTO<CreateUserOutputDto>> {
    let response: reponsesDTO<CreateUserOutputDto>;

    const responseUser: reponsesDTO<Users> =
      await this._createUserService.CreateUser(data);
    const statusCode = responseUser.statusCode;
    const message = responseUser.message;

    if (responseUser.data) {
      let userPresenter: CreateUserPresenter = new CreateUserPresenter();
      const dataResponse = userPresenter.present(responseUser.data);
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
