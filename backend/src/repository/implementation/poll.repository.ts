import { Types } from "mongoose";
import { IPollModel, pollModel } from "../../model/poll.model";
import { IPoll } from "../../types/poll.types";
import { IPollRepository } from "../interface/poll.repository.interface";
import { BaseRepository } from "../base.repository";

export class PollRepository extends BaseRepository<IPollModel> implements IPollRepository {
  constructor() {
    super(pollModel);
  }

  async create(data: Omit<IPoll, "createdAt" | "updatedAt" | "isActive"> & { isActive?: boolean }) {
    return pollModel.create(data);
  }

  async findById(pollId: string | Types.ObjectId) {
    return pollModel.findById(pollId).populate("options.voters", "name email").exec();
  }

  async findByRoomId(roomId: string) {
    return pollModel.findOne({ roomId }).populate("options.voters", "name email").exec();
  }

  async incrementVote(pollId: string, optionId: string, userId: string) {
    await pollModel
      .findOneAndUpdate(
        { _id: pollId, "options._id": optionId, isActive: true, voters: { $ne: userId } },
        {
          $inc: { "options.$.votes": 1 },
          $addToSet: { "options.$.voters": userId, voters: userId },
        },
        { new: true }
      )
      .exec();

    return this.findById(pollId);
  }
  async decrementVote(pollId: string, optionId: string, userId: string) {
    await pollModel
      .findOneAndUpdate(
        { _id: pollId, isActive: true, "options._id": optionId, "options.voters": userId },
        {
          $inc: { "options.$.votes": -1 },
          $pull: { "options.$.voters": userId, voters: userId },
        },
        { new: true }
      )
      .exec();

    await pollModel.updateOne(
      { _id: pollId, "options._id": optionId, "options.votes": { $lt: 0 } },
      { $set: { "options.$.votes": 0 } }
    );

    return this.findById(pollId);
  }

  async deleteByIdAndCreator(pollId: string, creatorId: string) {
    const deleted = await pollModel.findOneAndDelete({ _id: pollId, createdBy: creatorId }).exec();
    return !!deleted;
  }

  async setInactive(pollId: string | Types.ObjectId) {
    return pollModel.findByIdAndUpdate(pollId, { isActive: false }, { new: true }).exec();
  }

  async listAll() {
    return pollModel.find().sort({ createdAt: -1 }).exec();
  }
}
