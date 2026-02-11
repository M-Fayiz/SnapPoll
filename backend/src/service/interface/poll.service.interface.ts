import { IPoll } from "../../types/poll.types";

export interface IPollService {
  createPoll(data: {
    question: string;
    createdBy: string;
    options: { text: string }[];
    expiresAt: Date;
  }): Promise<IPoll>;

  getPoll(pollId: string): Promise<IPoll | null>;

  vote(pollId: string, optionId: string, userId: string): Promise<IPoll | null>;

  listPolls(): Promise<IPoll[]>;
}
