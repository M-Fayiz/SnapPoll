import { Server } from "socket.io";
import { SocketEvents } from "../constant/socketEvent.const";
import { registerChatSocket } from "./chat.socket";
import { registerPollSocket } from "./poll.socket";

export const registerSockets = (io: Server) => {
  io.on(SocketEvents.CONNECT, (socket) => {
    registerPollSocket(io, socket);
    registerChatSocket(io, socket);

    socket.on(SocketEvents.DISCONNECT, () => {
      // No-op for now
    });
  });
};
