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
  members?: AssignationOutputDto[];
  createdAt?: string;
  updatedAt?: string;
  id?: string;
}

export class AssignationOutputDto {
  id: string;
  user: {
    id: string;
    email: string;
    userName?: string;
  };
  createdAt: string;
  updatedAt?: string;
}

export class GroupsOutputDto {
  id: string;
  name: string;
  admin: string;
  createdAt: string;
}

// assignation

export class UserAssignationOutputDto {
  id: string;
  group: {
    id: string;
    name: string;
  };
  user: {
    id: string;
    email: string;
    userName?: string;
  };
  createdAt?: string;
  updatedAt?: string;
}
