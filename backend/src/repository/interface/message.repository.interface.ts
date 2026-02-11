import { IMessageModel } from "../../model/message.model";
import { IMessage } from "../../types/message.types";



export interface IMessageRepository  {
  create(data: Omit<IMessage, "createdAt" | "updatedAt">): Promise<IMessageModel>;
  listByPoll(pollId: string, limit?: number): Promise<IMessageModel[]>;
  findMessage(messageId:string):Promise<IMessageModel|null>
}
