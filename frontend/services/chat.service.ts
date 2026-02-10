import { axiosInstance } from "./api"; 

export interface ChatMessage {
  _id: string;
  pollId: string;
  userId: string;
  text: string;
  createdAt: string;
  updatedAt: string;
}

export const chatService = {
  listMessages: async (pollId: string) =>
    (await axiosInstance.get<ChatMessage[]>(`/polls/${pollId}/messages`)).data,
  sendMessage: async (pollId: string, userId: string, text: string) =>
    (await axiosInstance.post<ChatMessage>(`/polls/${pollId}/messages`, { userId, text })).data,
};
