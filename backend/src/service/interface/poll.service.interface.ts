import { IPoll } from "../../types/poll.types";

export interface IPollService {
  createPoll(data: {
    question: string;
    options: { text: string }[];
    createdBy: string;
    roomId: string;
    expiresAt: Date;
  }): Promise<IPoll>;

  getPoll(pollId: string): Promise<IPoll | null>;

  vote(pollId: string, optionId: string): Promise<IPoll | null>;

  listPolls(): Promise<IPoll[]>;
}
