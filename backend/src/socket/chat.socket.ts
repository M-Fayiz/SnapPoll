import { Server, Socket } from "socket.io";
import { SocketEvents } from "../constant/socketEvent.const";
import { chatService } from "../container/service";

export const registerChatSocket = (io: Server, socket: Socket) => {
  socket.on(
    SocketEvents.CHAT_MESSAGE,

    async (payload: { pollId: string; userId: string; text: string }) => {
      if (!payload?.pollId || !payload?.userId || !payload?.text) return;

      const message = await chatService.sendMessage(payload);

      const populated = await chatService
                      .findMessage(String(message._id))
                     


      io.to(payload.pollId).emit(SocketEvents.CHAT_MESSAGE, populated ?? message);
    }
  );

  socket.on(SocketEvents.CHAT_TYPING, (payload: { pollId: string; userId: string }) => {
    
    if (!payload?.pollId || !payload?.userId) return;

    socket.to(payload.pollId).emit(SocketEvents.CHAT_TYPING, payload);
  });
};
