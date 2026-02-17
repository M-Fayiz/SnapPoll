import { axiosInstance } from "./api";

export interface ChatUser {
  _id?: string;
  name?: string;
  avatar?: string;
}

export interface ChatMessage {
  _id: string;
  pollId: string;
  userId: string | ChatUser;
  text: string;
  createdAt: string;
  updatedAt: string;
}

export const chatService = {
  listMessages: async (pollId: string) =>{
   const response = await axiosInstance.get<ChatMessage[]>(`/polls/${pollId}/messages`)
   return response.data
  },
  sendMessage: async (pollId: string, userId: string, text: string) =>{
   const response= await axiosInstance.post<ChatMessage>(`/polls/${pollId}/messages`, { userId, text })
   return response.data
  },
};
