import { IPoll } from "../../types/poll.types";

export interface IPollService {
  createPoll(data: {
    question: string;
    createdBy: string;
    options: { text: string }[];

  }): Promise<IPoll>;

  getPoll(pollId: string): Promise<IPoll | null>;

  vote(pollId: string, optionId: string, userId: string): Promise<IPoll | null>;
  removeVote(pollId: string, optionId: string, userId: string): Promise<IPoll | null>;
  deletePoll(pollId: string, creatorId: string): Promise<boolean>;

  listPolls(): Promise<IPoll[]>;
}
