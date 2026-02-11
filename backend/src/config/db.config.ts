import mongoose from "mongoose";
import envConfig from "./env.config";

export const connectDB = async () => {
  try {
    await mongoose.connect(envConfig.MONGO_URL as string);

    console.log("DB CONNECTED |");
  } catch (error) {
    console.log("DB Error : ", error);
  }
};
