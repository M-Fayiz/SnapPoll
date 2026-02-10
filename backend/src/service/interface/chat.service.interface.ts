import { IMessage } from "../../types/message.types";

export interface IChatService {
  sendMessage(data: { pollId: string; userId: string; text: string }): Promise<IMessage>;
  getHistory(pollId: string, limit?: number): Promise<IMessage[]>;
}
