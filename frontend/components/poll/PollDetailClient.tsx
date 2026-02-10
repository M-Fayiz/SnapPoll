"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import ChatBox from "@/components/chat/ChatBox";
import PollCard from "@/components/poll/PollCard";
import { chatService, ChatMessage } from "@/services/chat.service";
import { pollService, Poll } from "@/services/poll.service";

interface PollDetailClientProps {
  pollId: string;
}

export default function PollDetailClient({ pollId }: PollDetailClientProps) {
  const router = useRouter();
  const [poll, setPoll] = useState<Poll | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const userId = useMemo(() => "demo-user", []);

  const voteTotal = useMemo(
    () => poll?.options.reduce((sum, opt) => sum + opt.votes, 0) || 0,
    [poll]
  );

  useEffect(() => {
    let active = true;
    Promise.all([pollService.getById(pollId), chatService.listMessages(pollId)])
      .then(([pollData, messageData]) => {
        if (!active) return;
        setPoll(pollData);
        setMessages(messageData);
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
    const accent = index % 2 === 0 ? "gold" : "mint";
    return {
      label: option.text,
      votes: option.votes,
      percentage,
      accent,
    } as const;
  });

  return (
    <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
      <PollCard
        title={poll.question}
        roomCode={poll.roomId}
        timeLeft={poll.isActive ? "Active" : "Closed"}
        totalVotes={voteTotal}
        options={options}
        onVote={async (index) => {
          const option = poll.options[index];
          if (!option) return;
          const updated = await pollService.vote(poll._id, option._id);
          setPoll(updated);
        }}
      />
      <ChatBox
        roomName={poll.roomId}
        messages={messages.map((message) => ({
          name: message.userId,
          text: message.text,
          tone: "muted",
        }))}
        onSend={async (text) => {
          const newMessage = await chatService.sendMessage(poll._id, userId, text);
          setMessages((prev) => [newMessage, ...prev]);
        }}
      />
    </div>
  );
}
