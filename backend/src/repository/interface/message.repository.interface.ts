import { IMessage } from "../../types/message.types";
import { IBaseRepository } from "./base.repository.interface";

export interface IMessageRepository extends IBaseRepository<IMessage> {
  create(data: Omit<IMessage, "createdAt" | "updatedAt">): Promise<IMessage>;
  listByPoll(pollId: string, limit?: number): Promise<IMessage[]>;
}
