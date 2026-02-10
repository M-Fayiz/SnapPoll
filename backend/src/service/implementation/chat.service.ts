import { Types } from "mongoose";
import { IChatService } from "../interface/chat.service.interface";
import { IMessageRepository } from "../../repository/interface/message.repository.interface";
import { MessageRepository } from "../../repository/implementation/message.repository";

export class ChatService implements IChatService {
  constructor(private readonly messageRepo: IMessageRepository = new MessageRepository()) {}

  async sendMessage(data: { pollId: string; userId: string; text: string }) {
    return this.messageRepo.create({
      pollId: new Types.ObjectId(data.pollId),
      userId: new Types.ObjectId(data.userId),
      text: data.text
    } as never);
  }

  async getHistory(pollId: string, limit = 50) {
    return this.messageRepo.listByPoll(pollId, limit);
  }
}
