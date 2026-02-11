import { IMessageModel } from "../../model/message.model";
import { IMessage } from "../../types/message.types";

export interface IChatService {
  sendMessage(data: { pollId: string; userId: string; text: string }): Promise<IMessage>;
  getHistory(pollId: string, limit?: number): Promise<IMessageModel[]>;
  findMessage(messageId:string):Promise<IMessageModel>
}
