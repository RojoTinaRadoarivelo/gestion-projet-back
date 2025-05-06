export class CreateUserOutputDto {
  email: string;
  createdAt: string;
  id?: string;
  userName?: string;
  avatar?: string;
}

export class UpdateUserOutputDto {
  email: string;
  createdAt: string;
  id?: string;
  userName?: string;
  avatar?: string;
}

export class UserOutputDto {
  email: string;
  updatedAt?: string;
  createdAt?: string;
  id?: string;
  userName?: string;
  avatar?: string;
  isBlocked?: boolean;
}

export class UsersOutputDto {
  id: string;
  email: string;
  createdAt: string;
  userName?: string;
  avatar?: string;
}
