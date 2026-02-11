import { Schema, Document, Types, model } from "mongoose";
import { IUser } from "../types/user.types";
import { dbModelName } from "../constant/dbModel.const";

export interface IUserModel extends IUser, Document<Types.ObjectId> {}

const UserSchema = new Schema<IUserModel>(
  {
    googleId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
  },
  { timestamps: true }
);

export const UserModel = model(dbModelName.USER, UserSchema);
