import dotenv from "dotenv";
dotenv.config();

const envConfig = {
  get PORT() {
    return process.env.PORT;
  },
  get EMAIL() {
    return process.env.EMAIL;
  },
  get PASS_KEY() {
    return process.env.PASS_KEY;
  },
  get CLIENT_URL() {
    return process.env.CLIENT_URL;
  },
  get MONGO_URL() {
    return process.env.MONGO_URL;
  },
  get GOOGLE_CALLBACK_URL() {
    return process.env.GOOGLE_CALLBACK_URL;
  },
  get GOOGLE_CLIENT_SECRET() {
    return process.env.GOOGLE_CLIENT_SECRET;
  },
  get GOOGLE_CLIENT_ID() {
    return process.env.GOOGLE_CLIENT_ID;
  },
  get SESSION_SECRET() {
    return process.env.SESSION_SECRET;
  },
};

export default envConfig;
