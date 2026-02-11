import { io, Socket } from "socket.io-client";

const SOCKET_URL = (process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:5000").replace(
  /\/$/,
  ""
);

export const socket: Socket = io(SOCKET_URL, {
  autoConnect: false,
  withCredentials: true,
});

export const SocketEvents = {
  POLL_JOIN: "poll:join",
  POLL_VOTE: "poll:vote",
  POLL_UPDATE: "poll:update",
  POLL_EXPIRED: "poll:expired",
  CHAT_MESSAGE: "chat:message",
  CHAT_TYPING: "chat:typing",
};
