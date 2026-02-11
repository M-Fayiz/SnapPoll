import { Server, Socket } from "socket.io";
import { SocketEvents } from "../constant/socketEvent.const";
import { pollService } from "../container/service";

export const registerPollSocket = (io: Server, socket: Socket) => {
  socket.on(SocketEvents.POLL_JOIN, (pollId: string) => {
    if (pollId) socket.join(pollId);
  });

  socket.on(
    SocketEvents.POLL_VOTE,
    async (payload: { pollId: string; optionId: string; userId: string }) => {
      if (!payload?.pollId || !payload?.optionId || !payload?.userId) return;

      const updated = await pollService.vote(payload.pollId, payload.optionId, payload.userId);
      if (!updated) {
        io.to(payload.pollId).emit(SocketEvents.POLL_EXPIRED, { pollId: payload.pollId });
        return;
      }
      io.to(payload.pollId).emit(SocketEvents.POLL_UPDATE, updated);
    }
  );
};
