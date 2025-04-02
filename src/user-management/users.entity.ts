export class Users {
  private _id?: string | null;
  private _email: string;
  private _password: string;
  private _userName?: string | null;
  private _avatar?: string | null;
  private _createdAt: Date;
  private _updatedAt?: Date;
  private _isBlocked?: boolean;

  // Getter & Setter

  public get id(): string | null {
    return this._id;
  }

  public set id(v: string | null) {
    this._id = v;
  }

  public get email(): string {
    return this._email;
  }

  public set email(v: string) {
    this._email = v;
  }

  public get password(): string {
    return this._password;
  }

  public set password(v: string) {
    this._password = v;
  }

  public get userName(): string | null {
    return this._userName;
  }

  public set userName(v: string | null) {
    this._userName = v;
  }

  public get avatar(): string | null {
    return this._avatar;
  }

  public set avatar(v: string | null) {
    this._avatar = v;
  }

  public get createdAt(): Date {
    return this._createdAt;
  }

  public set createdAt(v: Date) {
    this._createdAt = v;
  }

  public get updatedAt(): Date {
    return this._updatedAt;
  }

  public set updatedAt(v: Date) {
    this._updatedAt = v;
  }

  public get isBlocked(): boolean {
    return this._isBlocked;
  }

  public set isBlocked(v: boolean) {
    this._isBlocked = v;
  }

  constructor(data: {
    email: string;
    password: string;
    createdAt: Date;
    id?: string | null;
    userName?: string | null;
    avatar?: string | null;
    updatedAt?: Date;
    isBlocked?: boolean;
  }) {
    this.email = data.email;
    this.password = data.password;
    this.createdAt = data.createdAt;
    this.id = data.id ?? null;
    this.userName = data.userName ?? null;
    this.avatar = data.avatar ?? null;
    this.updatedAt = data.updatedAt;
    this.isBlocked = data.isBlocked ?? false;
  }
}
