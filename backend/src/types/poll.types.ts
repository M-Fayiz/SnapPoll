import { Types } from "mongoose"

export interface IPoll{
    

  question: string,

  options: IPollOption[],

  createdBy: Types.ObjectId,   

  roomId: string,        

  expiresAt: Date,
  isActive: boolean,

  createdAt?: Date,
  updatedAt?: Date
}

export interface IPollOption{
    _id?:Types.ObjectId,
    text:string,
    votes:number
}
