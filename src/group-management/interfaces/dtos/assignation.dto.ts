import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { ErrorMessages } from 'src/core/utils/interfaces/error-messages';

export class CreateAssignationDto {
  @IsNotEmpty({ message: ErrorMessages.REQUIRED, groups: ['create'] })
  @IsUUID('4', { message: ErrorMessages.INVALID_ID })
  group_id: string;
  @IsNotEmpty({ message: ErrorMessages.REQUIRED, groups: ['create'] })
  @IsUUID('4', { message: ErrorMessages.INVALID_ID })
  user_id: string;
}

export class UpdateAssignationDto extends PartialType(CreateAssignationDto) {}
