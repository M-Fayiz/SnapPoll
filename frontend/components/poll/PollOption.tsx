export interface PollOptionProps {
  label: string;
  percentage: number;
  votes: number;
  accent?: "gold" | "mint" | "rose";
  active?: boolean;
  onSelect?: () => void;
}

const accentMap = {
  gold: "from-[#f5d547]/80 to-[#f5d547]/20",
  mint: "from-[#7ee7d3]/80 to-[#7ee7d3]/20",
  rose: "from-[#f07c7c]/80 to-[#f07c7c]/20",
};

export default function PollOption({
  label,
  percentage,
  votes,
  accent = "gold",
  active = false,
  onSelect,
}: PollOptionProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`group relative flex w-full flex-col gap-2 rounded-2xl border px-4 py-3 text-left transition ${
        active ? "border-white/40 bg-white/10" : "border-white/10 bg-white/5"
      }`}
    >
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-[var(--ink)]">{label}</span>
        <span className="text-xs text-[var(--muted)]">{votes} votes</span>
      </div>
      <div className="relative h-2 overflow-hidden rounded-full bg-white/5">
        <div
          className={`absolute left-0 top-0 h-full bg-gradient-to-r ${accentMap[accent]}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className="flex items-center justify-between text-xs text-[var(--muted)]">
        <span>{percentage}%</span>
        <span className="opacity-0 transition group-hover:opacity-100">
          Click to vote
        </span>
      </div>
    </button>
  );
}
