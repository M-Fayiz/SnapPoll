export enum SocketEvents {
  CONNECT = "connection",
  DISCONNECT = "disconnect",
  POLL_JOIN = "poll:join",
  POLL_VOTE = "poll:vote",
  POLL_VOTE_REMOVE = "poll:vote-remove",
  POLL_DELETE = "poll:delete",
  POLL_DELETED = "poll:deleted",
  POLL_UPDATE = "poll:update",
  POLL_EXPIRED = "poll:expired",
  POLL_ERROR = "poll:error",
  CHAT_MESSAGE = "chat:message",
  CHAT_TYPING = "chat:typing",
}
