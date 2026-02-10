import { QueryFilter, Model, UpdateQuery } from "mongoose";
import { IBaseRepository } from "../interface/base.repository.interface";

export class BaseRepository<T> implements IBaseRepository<T> {
  constructor(protected readonly model: Model<T>) {}

  create(data: Partial<T>) {
    return this.model.create(data);
  }

  findById(id: string) {
    return this.model.findById(id).exec();
  }

  findOne(filter: QueryFilter<T>) {
    return this.model.findOne(filter).exec();
  }

  findMany(filter: QueryFilter<T> = {}) {
    return this.model.find(filter).exec();
  }

  updateOne(filter: QueryFilter<T>, update: UpdateQuery<T>) {
    return this.model.findOneAndUpdate(filter, update, { new: true }).exec();
  }

  deleteOne(filter: QueryFilter<T>) {
    return this.model.deleteOne(filter).exec();
  }
}
