import { Presenter } from 'src/core/utils/interfaces/presenters';
import { Users } from 'src/user-management/users.entity';
import { SignedUserDto } from '../dtos/signed-user.dto';

export class AuthUserPresenter implements Presenter<Users, SignedUserDto> {
  present(data: Users, options?: any): SignedUserDto {
    let response: SignedUserDto;
    if (data instanceof Users) {
      response = {
        id: data.id,
        email: data.email,
        avatar: data.avatar ?? '',
        userName: data.userName ?? '',
      };
    } else {
      response = null;
    }
    return response;
  }
}
