import { Body, Controller, Param, Put, UsePipes } from '@nestjs/common';
import { BlockUserService } from './block-user.service';
import { GenericDtoValidatorPipe } from 'src/core/middlewares/pipes/generic-dto-validator.pipe';
import { StatusUserDto } from '../interfaces/dtos/status-user.dto';
import { UuidValidatorPipe } from 'src/core/middlewares/pipes/uuid-validator.pipe';
import { UserOutputDto } from '../interfaces/dtos/outputs.dto';
import { BlockUserPresenter } from '../interfaces/presenters/users.presenter';
import { reponsesDTO } from 'src/core/utils/interfaces/responses';
import { Users } from '../users.entity';

@Controller('users')
export class BlockUserController {
  constructor(private readonly _blockUserService: BlockUserService) {}

  @Put('block/:id')
  @UsePipes(new GenericDtoValidatorPipe<StatusUserDto>())
  async BlockUser(
    @Param('id', UuidValidatorPipe) id: string,
    @Body() data: StatusUserDto,
  ): Promise<reponsesDTO<UserOutputDto>> {
    let response: reponsesDTO<UserOutputDto>;

    const responseUser: reponsesDTO<Users> =
      await this._blockUserService.blockingUser(id, data);
    const statusCode = responseUser.statusCode;
    const message = responseUser.message;

    if (responseUser.data) {
      let userPresenter: BlockUserPresenter = new BlockUserPresenter();
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
