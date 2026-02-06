import {Schema,Document, Types,model} from 'mongoose'
import { IUser } from '../types/user.types';

export interface IUserModel extends IUser , Document<Types.ObjectId>{}

const UserSchema = new Schema <IUserModel>({
    googleId:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    name:{
        types:String,
        required:true
    }
},{timestamps:true})

export const UserModel = model('User',UserSchema)