import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { ErrorMessages } from 'src/core/utils/interfaces/error-messages';

export class CreateGroupDto {
  @IsNotEmpty({ message: ErrorMessages.REQUIRED, groups: ['create'] })
  @IsString({ message: ErrorMessages.INVALID_TYPE })
  name: string;
  @IsOptional()
  @IsUUID('4', { message: ErrorMessages.INVALID_ID })
  createdBy?: string;
}
