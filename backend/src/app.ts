import express, { Application } from "express";
import cors from "cors";
import http from "http";
import router from "./router";
import { Server } from "socket.io";
import { registerSockets } from "./socket";
import { connectDB } from "./config/db.config";
import envConfig from "./config/env.config";
import morgan from 'morgan'


const app: Application = express();
const server = http.createServer(app);
const CLIENT_URL = envConfig.CLIENT_URL
const io = new Server(server, {
  cors: {
    origin: CLIENT_URL,
    credentials: true
  }
});



app.use(cors({
  origin: CLIENT_URL,
  credentials: true,
  methods: ["POST", "GET", "PUT", "DELETE", "OPTIONS"]
}));

app.use(express.json());
app.use(morgan("dev"));
app.use("/api", router);

registerSockets(io);

const start = async () => {
  
  await connectDB()
 

  server.listen(envConfig.PORT, () => {
    console.log(`Server is running on ${envConfig.PORT}`);
  });
};

start().catch((err) => {
  console.error("Failed to start server", err);
  process.exit(1);
});
