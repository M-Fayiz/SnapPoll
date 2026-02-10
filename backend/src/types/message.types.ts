import { Types } from "mongoose";

export interface IMessage {
  pollId: Types.ObjectId;
  userId: Types.ObjectId;
  text: string;
  createdAt: Date;
  updatedAt: Date;
}
