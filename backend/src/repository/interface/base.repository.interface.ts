import { QueryFilter, UpdateQuery } from "mongoose";

export interface IBaseRepository<T> {
  create(data: Partial<T>): Promise<T>;
  findById(id: string): Promise<T | null>;
  findOne(filter: QueryFilter<T>): Promise<T | null>;
  findMany(filter?: QueryFilter<T>): Promise<T[]>;
  updateOne(filter: QueryFilter<T>, update: UpdateQuery<T>): Promise<T | null>;
  deleteOne(filter: QueryFilter<T>): Promise<unknown>;
}
