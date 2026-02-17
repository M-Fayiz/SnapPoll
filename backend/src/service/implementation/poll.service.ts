import { Types } from "mongoose";
import { IPollService } from "../interface/poll.service.interface";
import { IPollRepository } from "../../repository/interface/poll.repository.interface";
import { generateId } from "../../utils/generateRoomId";

export class PollService implements IPollService {
  constructor(private readonly pollRepo: IPollRepository) {}

  async createPoll(data: {
    question: string;
    options: { text: string }[];
    createdBy: string;
    roomId: string;

  }) {
    const options = data.options.map((opt) => ({ text: opt.text, votes: 0 }));
    const roomId = generateId();
    return this.pollRepo.create({
      question: data.question,
      options,
      roomId,
      createdBy: new Types.ObjectId(data.createdBy),

    } as never);
  }

  async getPoll(pollId: string) {
    const poll = await this.pollRepo.findById(pollId);
    if (!poll) return null;
   
    return poll;
  }

  async vote(pollId: string, optionId: string, userId: string) {
    const poll = await this.pollRepo.findById(pollId);
    if (!poll) return null;


    return this.pollRepo.incrementVote(pollId, optionId, userId);
  }
  async removeVote(pollId: string, optionId: string, userId: string) {
    const poll = await this.pollRepo.findById(pollId);
    if (!poll) return null;


    return this.pollRepo.decrementVote(pollId, optionId, userId);
  }

  async deletePoll(pollId: string, creatorId: string) {
    return this.pollRepo.deleteByIdAndCreator(pollId, creatorId);
  }

  async listPolls() {
    return this.pollRepo.listAll();
  }
}
