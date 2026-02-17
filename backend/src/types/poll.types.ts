import { Types } from "mongoose";

export interface IPoll {
  question: string;

  options: IPollOption[];

  createdBy: string;

  roomId: string;

  expiresAt: Date;
  isActive: boolean;
  voters?: string[];

  createdAt?: Date;
  updatedAt?: Date;
}

export interface IPollOption {
  _id?: Types.ObjectId;
  text: string;
  votes: number;
  voters?: string[];
}
