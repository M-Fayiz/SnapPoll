import { Types } from "mongoose";
import { IPollService } from "../interface/poll.service.interface";
import { IPollRepository } from "../../repository/interface/poll.repository.interface";

export class PollService implements IPollService {
  constructor(private readonly pollRepo: IPollRepository) {}

  async createPoll(data: {
    question: string;
    options: { text: string }[];
    createdBy: string;
    roomId: string;
    expiresAt: Date;
  }) {
    const options = data.options.map((opt) => ({ text: opt.text, votes: 0 }));
    return this.pollRepo.create({ 
      question: data.question,
      options,
      createdBy: Types.ObjectId.isValid(data.createdBy)
  ? new Types.ObjectId(data.createdBy)
  : new Types.ObjectId(),
      roomId: data.roomId,
      expiresAt: data.expiresAt
    } as never);
  }

  async getPoll(pollId: string) {
    const poll = await this.pollRepo.findById(pollId);
    if (!poll) return null;

    const now = new Date();
    if (poll.isActive && poll.expiresAt <= now) {
      await this.pollRepo.setInactive(pollId);
      poll.isActive = false;
    }
    return poll;
  }

  async vote(pollId: string, optionId: string) {
    const poll = await this.pollRepo.findById(pollId);
    if (!poll) return null;

    const now = new Date();
    if (!poll.isActive || poll.expiresAt <= now) {
      await this.pollRepo.setInactive(pollId);
      return null;
    }

    return this.pollRepo.incrementVote(pollId, optionId);
  }

  async listPolls() {
    return this.pollRepo.listAll();
  }
}
