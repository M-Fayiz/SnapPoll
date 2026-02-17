import { Types } from "mongoose";
import { IPoll } from "../../types/poll.types";

import { IPollModel } from "../../model/poll.model";


export interface IPollRepository  {
  create(
    data: Omit<IPoll, "createdAt" | "updatedAt" | "isActive"> & { isActive?: boolean }
  ): Promise<IPoll>;
  findById(pollId: string | Types.ObjectId): Promise<IPollModel | null>;
  findByRoomId(roomId: string): Promise<IPollModel | null>;
  incrementVote(pollId: string, optionId: string, userId: string): Promise<IPollModel | null>;
  decrementVote(pollId: string, optionId: string, userId: string): Promise<IPollModel | null>;
  deleteByIdAndCreator(pollId: string, creatorId: string): Promise<boolean>;
  setInactive(pollId: string | Types.ObjectId): Promise<IPollModel | null>;
  listAll(): Promise<IPollModel[]>;
}
