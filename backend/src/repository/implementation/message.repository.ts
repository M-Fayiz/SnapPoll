import { IMessageModel, MessageModel } from "../../model/message.model";
import { IMessage } from "../../types/message.types";
import { IMessageRepository } from "../interface/message.repository.interface";
import { BaseRepository } from "../base.repository";

export class MessageRepository extends BaseRepository<IMessageModel> implements IMessageRepository {
  constructor() {
    super(MessageModel);
  }

  async create(data: Omit<IMessage, "createdAt" | "updatedAt">) {
    return MessageModel.create(data);
  }

  async listByPoll(pollId: string, limit = 50) {
    return MessageModel.find({ pollId })
      .sort({ createdAt: -1 })
      .limit(limit)
      .exec();
  }
}
