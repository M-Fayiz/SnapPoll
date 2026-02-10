import { axiosInstance } from "./api"; 

export interface PollOption {
  _id: string;
  text: string;
  votes: number;
}

export interface Poll {
  _id: string;
  question: string;
  options: PollOption[];
  createdBy: string;
  roomId: string;
  expiresAt: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePollPayload {
  question: string;
  options: { text: string }[];
  createdBy: string;
  roomId: string;
  expiresAt: string;
}

export const pollService = {
  list: async () => (await axiosInstance.get<Poll[]>("/polls")).data,
  getById: async (id: string) => (await axiosInstance.get<Poll>(`/polls/${id}`)).data,
  create: async (payload: CreatePollPayload) =>
    (await axiosInstance.post<Poll>("/polls", payload)).data,
  vote: async (id: string, optionId: string) =>
    (await axiosInstance.post<Poll>(`/polls/${id}/vote`, { optionId })).data,
};
