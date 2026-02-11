import axios from "axios";
import type { AxiosInstance } from "axios";

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

const createInstance = (): AxiosInstance => {
  return axios.create({
    baseURL: API_BASE,
    withCredentials: true,
  });
};

export const axiosInstance = createInstance();
