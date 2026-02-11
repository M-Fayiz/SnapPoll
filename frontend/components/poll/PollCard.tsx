"use client";

import { useState } from "react";
import PollOption, { PollOptionProps } from "./PollOption";

interface PollCardProps {
  title: string;
  roomCode: string;
  timeLeft: string;
  totalVotes: number;
  options: Array<Omit<PollOptionProps, "active" | "onSelect">>;
  onVote?: (index: number) => Promise<void> | void;
}

export default function PollCard({
  title,
  roomCode,
  timeLeft,
  totalVotes,
  options,
  onVote,
}: PollCardProps) {
  const [selected, setSelected] = useState<number | null>(null);

  const handleSelect = async (index: number) => {
    setSelected(index);
    if (onVote) {
      await onVote(index);
    }
  };

  return (
    <div className="glass soft-ring rounded-3xl p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-[var(--muted)]">Live room</p>
          <h3 className="mt-3 font-[var(--font-display)] text-xl font-semibold">{title}</h3>
        </div>
        <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-[var(--muted)]">
          {timeLeft}
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-3 text-sm">
        {options.map((option, index) => (
          <PollOption
            key={option.label}
            {...option}
            active={selected === index}
            onSelect={() => handleSelect(index)}
          />
        ))}
      </div>

      <div className="mt-5 flex items-center justify-between text-xs text-[var(--muted)]">
        <span>{totalVotes} votes</span>
        <span>Room code: {roomCode}</span>
      </div>
    </div>
  );
}
