import { IUserModel, UserModel } from "../../model/user.model";
import { IUser } from "../../types/user.types";
import { IUserRepository } from "../interface/user.repository.interface";
import { BaseRepository } from "../base.repository"; 

export class UserRepository extends BaseRepository<IUserModel> implements IUserRepository {
  constructor() {
    super(UserModel);
  }

  async upsertByGoogleId(data: Omit<IUser, "createdAt" | "updatedAt">) {
    return UserModel.findOneAndUpdate(
      { googleId: data.googleId },
      { $set: data },
      { new: true, upsert: true }
    ).exec();
  }

  async findById(userId: string) {
    return UserModel.findById(userId).exec();
  }
}
