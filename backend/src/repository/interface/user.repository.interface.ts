import { IUser } from "../../types/user.types";
import { IBaseRepository } from "./base.repository.interface";

export interface IUserRepository extends IBaseRepository<IUser> {
  upsertByGoogleId(data: Omit<IUser, "createdAt" | "updatedAt">): Promise<IUser | null>;
  findById(userId: string): Promise<IUser | null>;
}
