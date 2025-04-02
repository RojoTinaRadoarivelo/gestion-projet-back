export class CreateUserOutputDto {
  email: string;
  createdAt: string;
  id?: string | null;
  userName?: string | null;
  avatar?: string | null;
}

export class UpdateUserOutputDto {
  email: string;
  createdAt: string;
  id?: string | null;
  userName?: string | null;
  avatar?: string | null;
}

export class UserOutputDto {
  email: string;
  createdAt: string;
  id?: string | null;
  userName?: string | null;
  avatar?: string | null;
  isBlocked?: boolean;
}

export class UsersOutputDto {
  id: string;
  email: string;
  createdAt: string;
  userName?: string | null;
  avatar?: string | null;
}
