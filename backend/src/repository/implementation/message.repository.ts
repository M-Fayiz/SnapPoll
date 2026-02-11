import { IMessageModel, MessageModel } from "../../model/message.model";
import { IMessage } from "../../types/message.types";
import { IMessageRepository } from "../interface/message.repository.interface";
import { BaseRepository } from "../base.repository";

export class MessageRepository extends BaseRepository<IMessageModel> implements IMessageRepository {
  constructor() {
    super(MessageModel);
  }

  async createMessage(data: Omit<IMessage, "createdAt" | "updatedAt">) {
    return this.create(data);
  }

  async listByPoll(pollId: string, limit = 50) {
    return this.findQuery({ pollId })
      .populate("userId", "name avatar")
      .sort({ createdAt: -1 })
      .limit(limit)
      .exec();
  }
  async findMessage(messageId:string):Promise<IMessageModel|null>{
    return this.findOneQuery({_id:messageId}) .populate("userId", "name avatar")
    .exec();
  }
}
