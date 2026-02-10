import { Document, Types, model, Schema } from "mongoose";
import { IPoll } from "../types/poll.types";
import { dbModelName } from "../constant/dbModel.const";

export interface IPollModel extends IPoll, Document<Types.ObjectId> {}

const PollShema = new Schema<IPollModel>({
  question: {
    type: String,
    required: true
  },

  options: [
    {
      _id: { type: Schema.Types.ObjectId, auto: true },
      text: { type: String, required: true },
      votes: { type: Number, default: 0 }
    }
  ],

  createdBy: {
    type: Types.ObjectId,
    ref: dbModelName.USER,
    required: true
  }, 

  roomId: { type: String, required: true, index: true },       

  expiresAt: { type: Date, required: true, index: true },
  isActive: { type: Boolean, default: true }
},{timestamps:true})

PollShema.index({ roomId: 1 }, { unique: true });

export const pollModel = model(dbModelName.POLL, PollShema)
