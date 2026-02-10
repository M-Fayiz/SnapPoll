"use client";

import Link from "next/link";
import { Poll } from "@/services/poll.service";

interface PollListProps {
  polls: Poll[];
}

export default function PollList({ polls }: PollListProps) {
  if (!polls.length) {
    return (
      <div className="glass soft-ring rounded-3xl p-6 text-sm text-[var(--muted)]">
        No polls yet. Create the first room.
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {polls.map((poll) => (
        <Link
          key={poll._id}
          href={`/poll/${poll._id}`}
          className="glass soft-ring flex flex-col gap-3 rounded-3xl p-6 transition hover:-translate-y-0.5"
        >
          <div className="flex items-center justify-between text-xs text-[var(--muted)]">
            <span>{poll.roomId}</span>
            <span>{poll.isActive ? "Active" : "Closed"}</span>
          </div>
          <h3 className="font-[var(--font-display)] text-lg font-semibold text-[var(--ink)]">
            {poll.question}
          </h3>
          <p className="text-xs text-[var(--muted)]">
            {poll.options.length} options · {poll.options.reduce((sum, opt) => sum + opt.votes, 0)} votes
          </p>
        </Link>
      ))}
    </div>
  );
}
