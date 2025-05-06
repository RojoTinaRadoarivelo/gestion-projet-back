import { Injectable, NestMiddleware } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { cookieOptions } from '../utils/cookies.util';
import { verifyObject } from '../utils/class-validation.util';
import { FindUsersService } from 'src/user-management/find-users/find-users.service';
import { UserOutputDto } from 'src/user-management/interfaces/dtos/outputs.dto';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private _findOneUserService: FindUsersService) {}
  async use(req: any, res: any, next: () => void) {
    const authCookie = req.cookies['accessToken'];

    req.user = null;
    try {
      if (!authCookie) {
        return next();
      }

      const decoded: any = jwt.verify(authCookie, process.env.TOKEN_SECRET);

      if (!decoded) {
        res.clearCookie('accessToken', cookieOptions);

        return next();
      }

      const user_id = decoded.sub;
      const user = await this.findUser(user_id);

      if (
        user &&
        user.data &&
        verifyObject<UserOutputDto>(user.data, UserOutputDto)
      ) {
        req.user = user.data;
      } else {
        res.clearCookie('accessToken', cookieOptions);
        req.user = null;
      }
    } catch (error) {
      console.log('Invalid token:', error.message);
    }
    next();
  }
  private async findUser(id: string): Promise<any> {
    return await this._findOneUserService.findOne(id);
  }
}
