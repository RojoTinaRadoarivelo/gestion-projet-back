import { Body, Controller, Param, Put, UsePipes } from '@nestjs/common';

import { UpdateUserService } from './update-user.service';
import { UpdateUserDto } from '../interfaces/dtos/update-user.dto';
import { UpdateUserPresenter } from '../interfaces/presenters/users.presenter';
import { GenericDtoValidatorPipe } from 'src/core/middlewares/pipes/generic-dto-validator.pipe';
import { UuidValidatorPipe } from 'src/core/middlewares/pipes/uuid-validator.pipe';
import { reponsesDTO } from 'src/core/utils/interfaces/responses';
import { UserOutputDto } from '../interfaces/dtos/outputs.dto';
import { Users } from '../users.entity';

@Controller('users')
export class UpdateUserController {
  constructor(private readonly _updateUserService: UpdateUserService) {}

  @Put(':id')
  @UsePipes(new GenericDtoValidatorPipe<UpdateUserDto>())
  async updateOneUser(
    @Param('id', UuidValidatorPipe) id: string,
    @Body() data: UpdateUserDto,
  ): Promise<reponsesDTO<UserOutputDto>> {
    let response: reponsesDTO<UserOutputDto>;

    const responseUser: reponsesDTO<Users> =
      await this._updateUserService.UpdateOne(id, data);
    const statusCode = responseUser.statusCode;
    const message = responseUser.message;

    if (responseUser.data) {
      let userPresenter: UpdateUserPresenter = new UpdateUserPresenter();
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
