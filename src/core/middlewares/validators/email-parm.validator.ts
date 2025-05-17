import { PipeTransform } from '@nestjs/common';
import { isEmail } from 'class-validator';
import { HttpExceptionUtil } from 'src/core/utils/http-exception.util';
import { ErrorMessages } from 'src/core/utils/interfaces/error-messages';

export class EmailParamValidatorPipe implements PipeTransform {
  transform(value: string): string {
    if (!isEmail(value)) {
      HttpExceptionUtil.badRequest(ErrorMessages.INVALID_EMAIL);
    }
    return value;
  }
}
