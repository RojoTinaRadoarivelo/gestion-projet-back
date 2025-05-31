import { Users } from 'src/user-management/users.entity';
import { Groups } from './group.entity';

export class UserAssignation {
  private _id?: string | null;
  private _group: Groups | null;
  private _user: Users | null;
  private _createdAt: Date;
  private _updatedAt?: Date;

  // Getter & Setter

  public get id(): string | null {
    return this._id;
  }

  public set id(v: string | null) {
    this._id = v;
  }

  public get group(): Groups | null {
    return this._group;
  }

  public set group(v: Groups | null) {
    this._group = v;
  }

  public get user(): Users {
    return this._user;
  }

  public set user(v: Users) {
    this._user = v;
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

  constructor(data: {
    group: Groups | null;
    user: Users | null;
    createdAt: Date;
    id?: string | null;
    updatedAt?: Date;
  }) {
    this.group = data.group;
    this.user = data.user;
    this.createdAt = data.createdAt;
    this.id = data.id ?? null;
    this.updatedAt = data.updatedAt;
  }
}
