import { IUserModel } from "../../model/user.model";
import { IUser } from "../../types/user.types";
import { BaseRepository } from "../base.repository";


export interface IUserRepository  {
  upsertByGoogleId(data: Omit<IUser, "createdAt" | "updatedAt">): Promise<IUser | null>;
  findById(userId: string): Promise<IUser | null>;
}
