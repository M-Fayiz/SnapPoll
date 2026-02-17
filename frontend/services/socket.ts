import { io, Socket } from "socket.io-client";

const SOCKET_URL = process.env.NEXT_PUBLIC_API_URL_FOR_SOCKET 

export const socket: Socket = io(SOCKET_URL, {
  autoConnect: false,
  withCredentials: true,
});

export const SocketEvents = {
  POLL_JOIN: "poll:join",
  POLL_VOTE: "poll:vote",
  POLL_UPDATE: "poll:update",
  POLL_EXPIRED: "poll:expired",
  POLL_VOTE_REMOVE :"poll:vote-remove",
  POLL_DELETE: "poll:delete",
  POLL_DELETED: "poll:deleted",
  CHAT_MESSAGE: "chat:message",
  CHAT_TYPING: "chat:typing",
};
