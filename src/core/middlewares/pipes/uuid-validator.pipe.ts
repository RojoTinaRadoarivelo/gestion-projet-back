import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { isUUID } from 'class-validator';
import { HttpExceptionUtil } from 'src/core/utils/http-exception.util';
import { ErrorMessages } from 'src/core/utils/interfaces/error-messages';

@Injectable()
export class UuidValidatorPipe implements PipeTransform {
  transform(value: string, metadata?: ArgumentMetadata): string {
    if (!isUUID(value)) {
      HttpExceptionUtil.badRequest(ErrorMessages.INVALID_ID);
    }
    return value;
  }
}
