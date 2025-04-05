export interface Repository<C, U, R> {
  FindAll(params?: any): Promise<R[]>;
  FindOne(id: string, params?: any): Promise<R | null>;
  Create(data: C, params?: any): Promise<R | null>;
  CreateMany(data: C[], params?: any): Promise<R[]>;
  Update(
    id: string,
    showDetail: boolean,
    data: U,
    params?: any,
  ): Promise<R | null>;
  UpdateMany(data: U[], params?: any): Promise<R[]>;
  DeleteOne(id: string, params?: any): Promise<R | null>;
  DeleteAll(params?: any): Promise<R[]>;
}
