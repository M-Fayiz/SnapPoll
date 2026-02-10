import { Model, QueryFilter, UpdateQuery,Document } from "mongoose";

export abstract class BaseRepository<T extends Document> {
  constructor(private model: Model<T>) {}

 async create(data: Partial<T>): Promise<T> {
    const document = new this.model(data);
    return document.save();
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
