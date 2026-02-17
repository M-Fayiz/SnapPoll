import { useState } from "react";

export interface PollOptionProps {
  label: string;
  percentage: number;
  votes: number;
  voters?: { _id: string; name: string; email: string }[];
  accent?: "sand" | "sage" | "peach" | "stone" | "clay";
  active?: boolean;
  onSelect?: () => void;
}

const accentMap = {
  sand: "from-amber-300 to-orange-300",
  sage: "from-lime-300 to-emerald-300",
  peach: "from-rose-300 to-orange-200",
  stone: "from-zinc-300 to-slate-300",
  clay: "from-orange-300 to-amber-200",
};

export default function PollOption({
  label,
  percentage,
  votes,
  voters = [],
  accent = "indigo",
  active = false,
  onSelect,
}: PollOptionProps) {
  const [showVoters, setShowVoters] = useState(false);

  return (
    <div
      className={`group relative flex w-full flex-col gap-3 rounded-2xl border p-4 transition-all duration-300 ${
        active
          ? "border-amber-400/50 bg-amber-100/60 shadow-[0_6px_18px_rgba(146,64,14,0.12)]"
          : "border-black/10 bg-white/70 hover:bg-white hover:border-black/15"
        }`}
    >
      <div
        className="cursor-pointer"
        onClick={onSelect}
      >
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className={`font-medium transition-colors ${active ? "text-amber-900" : "text-[var(--ink)]"}`}>
            {label}
          </span>
          <span className="text-xs font-semibold text-[var(--muted)]">{votes} votes</span>
        </div>

        <div className="relative h-2.5 w-full overflow-hidden rounded-full bg-black/10">
          <div
            className={`absolute left-0 top-0 h-full rounded-full bg-gradient-to-r transition-all duration-500 ease-out ${accentMap[accent]}`}
            style={{ width: `${percentage}%` }}
          />
        </div>

        <div className="mt-2 flex items-center justify-between text-xs text-[var(--muted)]">
          <span className="font-medium">{percentage}%</span>
          <span className="opacity-0 transition-opacity group-hover:opacity-100">
            Click to vote
          </span>
        </div>
      </div>

      {voters && votes > 0 && (
        <div className="mt-2 border-t border-black/10 pt-2">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setShowVoters(!showVoters);
            }}
            className="flex items-center gap-2 text-xs text-[var(--muted)] transition-colors hover:text-[var(--ink)]"
          >
            <span>{showVoters ? "Hide voters" : "View voters"}</span>
            <svg
              className={`w-3 h-3 transition-transform ${showVoters ? "rotate-180" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {showVoters && (
            <div className="mt-2 max-h-32 overflow-y-auto pr-1">
              {voters.map((voter) => (
                <div
                  key={voter._id}
                  className="flex items-center gap-2 rounded-md p-1.5 transition-colors hover:bg-black/[0.04]"
                >
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-200 text-[10px] font-bold uppercase text-amber-800 shadow-sm">
                    {voter.name?.charAt(0) || "U"}
                  </div>
                  <span className="text-xs text-[var(--ink)]">{voter.name || "Unknown user"}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
