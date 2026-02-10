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
  get REDIS_URL() {
    return process.env.REDIS_URL;
  },
};

export default envConfig;
