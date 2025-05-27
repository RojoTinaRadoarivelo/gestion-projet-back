import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';

import { FindUsersService } from './find-users.service';
import {
  FindAllUserPresenter,
  FindOneUserPresenter,
} from '../interfaces/presenters/users.presenter';
import { reponsesDTO } from 'src/core/utils/interfaces/responses';
import { UserOutputDto, UsersOutputDto } from '../interfaces/dtos/outputs.dto';
import { Users } from '../users.entity';
import { UuidValidatorPipe } from 'src/core/middlewares/pipes/uuid-validator.pipe';
import { AuthGuard } from 'src/core/middlewares/auth.guard';

@Controller('users')
export class FindUsersController {
  constructor(private readonly _findUsersService: FindUsersService) {}

  @Get('info')
  @UseGuards(AuthGuard)
  async FindByToken(@Req() req: any): Promise<reponsesDTO<UserOutputDto>> {
    let userPresenter: FindOneUserPresenter = new FindOneUserPresenter();
    const dataResponse = req.user ? userPresenter.present(req.user) : null;
    return {
      message: 'Information about the user',
      data: dataResponse,
      statusCode: 200,
    };
  }

  @Get(':id')
  async FindOneUser(
    @Param('id', UuidValidatorPipe) id: string,
  ): Promise<reponsesDTO<UserOutputDto>> {
    let response: reponsesDTO<UserOutputDto>;

    const responseUser: reponsesDTO<Users> =
      await this._findUsersService.findOne(id);
    const statusCode = responseUser.statusCode;
    const message = responseUser.message;

    if (responseUser.data) {
      let userPresenter: FindOneUserPresenter = new FindOneUserPresenter();
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

  @Get()
  async FindAllUser(): Promise<reponsesDTO<UsersOutputDto[]>> {
    let response: reponsesDTO<UsersOutputDto[]>;

    const responseUsers: reponsesDTO<Users[]> =
      await this._findUsersService.findAll();
    const statusCode = responseUsers.statusCode;
    const message = responseUsers.message;

    if (responseUsers.data) {
      let userPresenter: FindAllUserPresenter = new FindAllUserPresenter();
      const dataResponse = userPresenter.present(responseUsers.data);
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
