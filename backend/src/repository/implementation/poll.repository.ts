import { Types } from "mongoose";
import { pollModel } from "../../model/poll.mode";
import { IPoll } from "../../types/poll.types";
import { IPollRepository } from "../interface/poll.repository.interface";
import { BaseRepository } from "./base.repository";

export class PollRepository extends BaseRepository<IPoll> implements IPollRepository {
  constructor() {
    super(pollModel);
  }

  async create(data: Omit<IPoll, "createdAt" | "updatedAt" | "isActive"> & { isActive?: boolean }) {
    return pollModel.create(data);
  }

  async findById(pollId: string | Types.ObjectId) {
    return pollModel.findById(pollId).exec();
  }

  async findByRoomId(roomId: string) {
    return pollModel.findOne({ roomId }).exec();
  }

  async incrementVote(pollId: string, optionId: string) {
    return pollModel.findOneAndUpdate(
      { _id: pollId, "options._id": optionId, isActive: true },
      { $inc: { "options.$.votes": 1 } },
      { new: true }
    ).exec();
  }

  async setInactive(pollId: string | Types.ObjectId) {
    return pollModel.findByIdAndUpdate(pollId, { isActive: false }, { new: true }).exec();
  }
}
