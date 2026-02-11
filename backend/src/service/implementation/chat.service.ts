import { Types } from "mongoose";
import { IChatService } from "../interface/chat.service.interface";
import { IMessageRepository } from "../../repository/interface/message.repository.interface";
import { IMessageModel } from "../../model/message.model";

export class ChatService implements IChatService {
  constructor(private readonly messageRepo: IMessageRepository) {}

  async sendMessage(data: { pollId: string; userId: string; text: string }):Promise<IMessageModel> {
    return this.messageRepo.create({
      pollId: new Types.ObjectId(data.pollId),
      userId: new Types.ObjectId(data.userId),
      text: data.text,
    } as never);
  }

  async getHistory(pollId: string, limit = 50) {
    return this.messageRepo.listByPoll(pollId, limit);
  }
  async findMessage(messageId: string): Promise<IMessageModel> {
    const message = await this.messageRepo.findMessage(messageId)

    if(!message){
      throw new Error('message not found')
    }
    return message
  }
}
