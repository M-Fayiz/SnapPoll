import { Types } from "mongoose";
import { IPoll } from "../../types/poll.types";
import { IBaseRepository } from "./base.repository.interface";

export interface IPollRepository extends IBaseRepository<IPoll> {
  create(data: Omit<IPoll, "createdAt" | "updatedAt" | "isActive"> & { isActive?: boolean }): Promise<IPoll>;
  findById(pollId: string | Types.ObjectId): Promise<IPoll | null>;
  findByRoomId(roomId: string): Promise<IPoll | null>;
  incrementVote(pollId: string, optionId: string): Promise<IPoll | null>;
  setInactive(pollId: string | Types.ObjectId): Promise<IPoll | null>;
  listAll(): Promise<IPoll[]>;
}
