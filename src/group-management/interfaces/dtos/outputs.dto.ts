export class CreateGroupOutputDto {
  name: string;
  createdAt: string;
  admin?: string;
  id?: string;
}

export class UpdateGroupOutputDto {
  name: string;
  admin: string;
  updatedAt: string;
  id?: string;
}

export class GroupOutputDto {
  name: string;
  admin: string;
  createdAt?: string;
  updatedAt?: string;
  id?: string;
}

export class GroupsOutputDto {
  id: string;
  name: string;
  admin: string;
  createdAt: string;
}
