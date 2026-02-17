import { useState } from "react";

export interface PollOptionProps {
  label: string;
  percentage: number;
  votes: number;
  voters?: { _id: string; name: string; email: string }[];
  accent?: "gold" | "mint" | "rose" | "indigo" | "purple";
  active?: boolean;
  onSelect?: () => void;
}

const accentMap = {
  gold: "from-amber-400 to-orange-500",
  mint: "from-emerald-400 to-teal-500",
  rose: "from-rose-400 to-pink-500",
  indigo: "from-indigo-400 to-purple-500",
  purple: "from-purple-400 to-fuchsia-500",
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
      className={`group relative flex w-full flex-col gap-3 rounded-2xl border p-4 transition-all duration-300 ${active
          ? "border-indigo-500/50 bg-indigo-500/10 shadow-[0_0_20px_rgba(99,102,241,0.15)]"
          : "border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/10"
        }`}
    >
      <div
        className="cursor-pointer"
        onClick={onSelect}
      >
        <div className="flex items-center justify-between text-sm mb-2">
          <span className={`font-medium transition-colors ${active ? "text-indigo-200" : "text-gray-200"}`}>
            {label}
          </span>
          <span className="text-xs font-semibold text-[var(--muted)]">{votes} votes</span>
        </div>

        <div className="relative h-2.5 w-full overflow-hidden rounded-full bg-white/5">
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

      {/* Voters Section */}
      {voters && votes > 0 && (
        <div className="mt-2 border-t border-white/5 pt-2">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setShowVoters(!showVoters);
            }}
            className="flex items-center gap-2 text-xs text-[var(--muted)] hover:text-indigo-300 transition-colors"
          >
            <span>{showVoters ? "Hide" : "See"} who voted</span>
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
            <div className="mt-2 flex flex-col gap-1 max-h-32 overflow-y-auto pr-1 thin-scrollbar animate-in slide-in-from-top-2 fade-in duration-200">
              {voters.map((voter) => (
                <div key={voter._id} className="flex items-center gap-2 rounded-md p-1.5 hover:bg-white/5 transition-colors">
                  <div className="h-5 w-5 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-[10px] font-bold text-white uppercase shadow-sm">
                    {voter.name?.charAt(0) || "U"}
                  </div>
                  <span className="text-xs text-gray-300">{voter.name || "Unknown user"}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
