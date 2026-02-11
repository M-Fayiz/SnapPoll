import { axiosInstance } from "./api";

export interface AuthUser {
  _id?: string;
  googleId?: string;
  email?: string;
  name?: string;
  avatar?: string;
}

export const authService = {
  getMe: async () => (await axiosInstance.get<AuthUser>("/auth/me")).data,
  logout: async () => (await axiosInstance.post("/auth/logout")).data,
  loginUrl: () => `${process.env.NEXT_PUBLIC_API_URL}/auth/google`,
};
