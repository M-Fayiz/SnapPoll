import { Server, Socket } from "socket.io";
import { SocketEvents } from "../constant/socketEvent.const";
import { PollService } from "../service/poll.service";

const pollService = new PollService();

export const registerPollSocket = (io: Server, socket: Socket) => {
  socket.on(SocketEvents.POLL_JOIN, (pollId: string) => {
    if (pollId) socket.join(pollId);
  });

  socket.on(SocketEvents.POLL_VOTE, async (payload: { pollId: string; optionId: string }) => {
    if (!payload?.pollId || !payload?.optionId) return;

    const updated = await pollService.vote(payload.pollId, payload.optionId);
    if (!updated) {
      io.to(payload.pollId).emit(SocketEvents.POLL_EXPIRED, { pollId: payload.pollId });
      return;
    }
    io.to(payload.pollId).emit(SocketEvents.POLL_UPDATE, updated);
  });
};
