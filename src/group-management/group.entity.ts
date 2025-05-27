import { Users } from 'src/user-management/users.entity';

export class Groups {
  private _id?: string | null;
  private _name: string;
  private _admin: Users | null;
  private _projects?: any[];
  private _createdAt: Date;
  private _updatedAt?: Date;

  // Getter & Setter

  public get id(): string | null {
    return this._id;
  }

  public set id(v: string | null) {
    this._id = v;
  }

  public get name(): string {
    return this._name;
  }

  public set name(v: string) {
    this._name = v;
  }

  public get admin(): Users {
    return this._admin;
  }

  public set admin(v: Users) {
    this._admin = v;
  }

  public get projects(): any[] {
    return this._projects;
  }

  public set projects(v: any[]) {
    this._projects = v;
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
    name: string;
    admin: Users | null;
    createdAt: Date;
    id?: string | null;
    projects?: any[];
    updatedAt?: Date;
  }) {
    this.name = data.name;
    this.admin = data.admin;
    this.createdAt = data.createdAt;
    this.id = data.id ?? null;
    this.projects = data.projects ?? [];
    this.updatedAt = data.updatedAt;
  }
}
