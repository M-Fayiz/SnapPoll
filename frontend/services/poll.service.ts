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
  expiresAt: string;
}

export const pollService = {
  list: async () => {
    const response = await axiosInstance.get<Poll[]>("/polls");
    return response.data;
  },
  getById: async (id: string) => {
    const response = await axiosInstance.get<Poll>(`/polls/${id}`);
    return response.data;
  },
  create: async (payload: CreatePollPayload) => {
    const response = await axiosInstance.post<Poll>("/polls", payload);
    return response.data;
  },
  vote: async (id: string, optionId: string, userId: string) =>
    (await axiosInstance.post<Poll>(`/polls/${id}/vote`, { optionId, userId })).data,
};
