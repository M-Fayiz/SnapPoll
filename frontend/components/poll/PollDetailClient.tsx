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
  const [userName, setUserName] = useState<string>("You");

  const voteTotal = useMemo(
    () => poll?.options.reduce((sum, opt) => sum + opt.votes, 0) || 0,
    [poll]
  );

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
        if (me?.name) setUserName(me.name);
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

    socket.on(SocketEvents.POLL_UPDATE, onPollUpdate);
    socket.on(SocketEvents.CHAT_MESSAGE, onChatMessage);
    socket.on(SocketEvents.POLL_EXPIRED, onExpired);

    return () => {
      socket.off(SocketEvents.POLL_UPDATE, onPollUpdate);
      socket.off(SocketEvents.CHAT_MESSAGE, onChatMessage);
      socket.off(SocketEvents.POLL_EXPIRED, onExpired);
    };
  }, [pollId]);

  if (loading) {
    return (
      <div className="glass soft-ring rounded-3xl p-6 text-sm text-[var(--muted)]">
        Loading poll...
      </div>
    );
  }
  console.log("userId :", userId);

  messages.map((message) => console.log(message.userId == userId));
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
    const accents = ["indigo", "purple", "rose", "mint", "gold"] as const;
    const accent = accents[index % accents.length];

    return {
      label: option.text,
      votes: option.votes,
      percentage,
      accent,
      voters: option.voters || [],
    } as const;
  });

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
      <PollCard
        title={poll.question}
        roomCode={poll.roomId}
        timeLeft={poll.isActive ? "Active" : "Closed"}
        totalVotes={voteTotal}
        options={options}
        onVote={async (index) => {
          const option = poll.options[index];
          if (!option) return;
          if (!userId) return;
          socket.emit(SocketEvents.POLL_VOTE, {
            pollId: poll._id,
            optionId: option._id,
            userId,
          });
        }}
      />
      <ChatBox
        roomName={poll.roomId}
        currentUserName={userName}
        messages={messages.map((message) => ({
          name:
            typeof message.userId === "string"
              ? message.userId === userId
                ? userName
                : message.userId
              : message.userId.name || "User",
          text: message.text,
          isMine: message.userId === userId ? true : false,
        }))}
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
  );
}
