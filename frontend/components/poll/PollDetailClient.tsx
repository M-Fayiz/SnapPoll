"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import ChatBox from "@/components/chat/ChatBox";
import PollCard from "@/components/poll/PollCard";
import { authService } from "@/services/auth.service";
import { chatService, ChatMessage } from "@/services/chat.service";
import { pollService, Poll } from "@/services/poll.service";
import { socket, SocketEvents } from "@/services/socket";

interface PollDetailClientProps {
  pollId: string;
}

export default function PollDetailClient({ pollId }: PollDetailClientProps) {
  const router = useRouter();
  const [poll, setPoll] = useState<Poll | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string>("");
  const [isDeleting, setIsDeleting] = useState(false);

  const voteTotal = useMemo(
    () => poll?.options.reduce((sum, opt) => sum + opt.votes, 0) || 0,
    [poll]
  );
  const isOwner = Boolean(userId && poll?.createdBy && String(poll.createdBy) === userId);

  useEffect(() => {
    let active = true;
    Promise.all([
      pollService.getById(pollId),
      chatService.listMessages(pollId),
      authService.getMe().catch(() => null),
    ])
      .then(([pollData, messageData, me]) => {
        if (!active) return;
        setPoll(pollData);
        setMessages(messageData.slice().reverse());
        if (me?._id) setUserId(me._id);
      })
      .catch(() => {
        if (!active) return;
        setPoll(null);
      })
      .finally(() => active && setLoading(false));

    return () => {
      active = false;
    };
  }, [pollId]);

  useEffect(() => {
    if (!pollId) return;
    if (!socket.connected) socket.connect();
    socket.emit(SocketEvents.POLL_JOIN, pollId);

    const onPollUpdate = (updated: Poll) => setPoll(updated);
    const onChatMessage = (message: ChatMessage) => setMessages((prev) => [...prev, message]);
    const onExpired = () => {
      setPoll((prev) => (prev ? { ...prev, isActive: false } : prev));
    };
    const onDeleted = () => {
      router.push("/dashboard");
    };

    socket.on(SocketEvents.POLL_UPDATE, onPollUpdate);
    socket.on(SocketEvents.CHAT_MESSAGE, onChatMessage);
    socket.on(SocketEvents.POLL_EXPIRED, onExpired);
    socket.on(SocketEvents.POLL_DELETED, onDeleted);

    return () => {
      socket.off(SocketEvents.POLL_UPDATE, onPollUpdate);
      socket.off(SocketEvents.CHAT_MESSAGE, onChatMessage);
      socket.off(SocketEvents.POLL_EXPIRED, onExpired);
      socket.off(SocketEvents.POLL_DELETED, onDeleted);
    };
  }, [pollId, router]);

  if (loading) {
    return (
      <div className="glass soft-ring rounded-3xl p-6 text-sm text-[var(--muted)]">
        Loading poll...
      </div>
    );
  }

  if (!poll) {
    return (
      <div className="glass soft-ring rounded-3xl p-6 text-sm text-[var(--muted)]">
        Poll not found.
        <button
          type="button"
          onClick={() => router.push("/dashboard")}
          className="mt-4 block rounded-full bg-[var(--accent)] px-4 py-2 text-xs font-semibold text-black"
        >
          Back to dashboard
        </button>
      </div>
    );
  }

  const options = poll.options.map((option, index) => {
    const percentage = voteTotal ? Math.round((option.votes / voteTotal) * 100) : 0;
    const accents = ["sand", "sage", "peach", "stone", "clay"] as const;

    const accent = accents[index % accents.length];

    return {
      label: option.text,
      votes: option.votes,
      percentage,
      accent,
      voters: option.voters || [],
    } as const;
  });
  const handleDelete = async () => {
    if (!poll || !userId || !isOwner || isDeleting) return;
    setIsDeleting(true);
    try {
      socket.emit(SocketEvents.POLL_DELETE, { pollId: poll._id, userId });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="glass soft-ring flex items-center justify-between rounded-2xl px-4 py-3">
        <span className="text-sm text-[var(--muted)]">Room: {poll.roomId}</span>
        <div className="flex items-center gap-2">
          {isOwner ? (
            <button
              type="button"
              onClick={handleDelete}
              disabled={isDeleting}
              className="rounded-full border border-red-300 bg-red-50 px-4 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-100 disabled:opacity-60"
            >
              {isDeleting ? "Deleting..." : "Delete poll"}
            </button>
          ) : null}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <PollCard
          title={poll.question}
          roomCode={poll.roomId}
          timeLeft={poll.isActive ? "Open" : "Closed"}
          totalVotes={voteTotal}
          options={options}
          onVote={(index) => {
            if (!poll || !userId) return;

            const option = poll.options[index];
            if (!option || !poll.isActive) return;

            const alreadyVoted = option.voters?.some((v) => String(v._id) === userId);

            socket.emit(alreadyVoted ? SocketEvents.POLL_VOTE_REMOVE : SocketEvents.POLL_VOTE, {
              pollId: poll._id,
              optionId: option._id,
              userId,
            });
          }}
        />

        <ChatBox
          roomName={poll.roomId}
          messages={messages.map((message) => {
            const senderId =
              typeof message.userId === "string" ? message.userId : String(message.userId?._id || "");
            return {
              name: typeof message.userId === "string" ? message.userId : message.userId.name || "User",
              text: message.text,
              isMine: senderId === userId,
            };
          })}
          disabled={!userId}
          onSend={async (text) => {
            socket.emit(SocketEvents.CHAT_MESSAGE, {
              pollId: poll._id,
              userId,
              text,
            });
          }}
        />
      </div>
    </div>
  );
}
