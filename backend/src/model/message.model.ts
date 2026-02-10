import { Document, Types, model, Schema } from "mongoose";
import { IMessage } from "../types/message.types";
import { dbModelName } from "../constant/dbModel.const";

export interface IMessageModel extends IMessage, Document<Types.ObjectId> {}

const MessageSchema = new Schema<IMessageModel>({
  pollId: {
    type: Types.ObjectId,
    ref: dbModelName.POLL,
    required: true,
    index: true
  },
  userId: {
    type: Types.ObjectId,
    ref: dbModelName.USER,
    required: true,
    index: true
  },
  text: {
    type: String,
    required: true
  }
},{ timestamps: true });

MessageSchema.index({ pollId: 1, createdAt: 1 });

export const MessageModel = model(dbModelName.MESSAGE, MessageSchema);
