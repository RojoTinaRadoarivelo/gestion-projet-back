import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  HttpException,
  HttpStatus,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

export class HttpExceptionUtil {
  static badRequest(message: string) {
    throw new BadRequestException(message);
  }

  static unauthorized(message: string) {
    throw new UnauthorizedException(message);
  }

  static forbidden(message: string) {
    throw new ForbiddenException(message);
  }

  static notfound(message: string) {
    throw new NotFoundException(message);
  }

  static conflict(message: string) {
    throw new ConflictException(message);
  }

  static tooManyRequest(message: string) {
    throw new HttpException(message, HttpStatus.TOO_MANY_REQUESTS);
  }

  static serviceUnvailable(message: string) {
    throw new HttpException(message, HttpStatus.SERVICE_UNAVAILABLE);
  }
}
