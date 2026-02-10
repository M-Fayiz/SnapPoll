export interface MessageItemProps {
  name: string;
  text: string;
  tone?: "gold" | "mint" | "muted";
}

const toneMap = {
  gold: "text-[var(--accent)]",
  mint: "text-[var(--accent-2)]",
  muted: "text-[var(--muted)]",
};

export default function MessageItem({ name, text, tone = "muted" }: MessageItemProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm">
      <span className={`${toneMap[tone]} font-medium`}>{name}</span>
      <span className="text-[var(--muted)]"> — </span>
      <span className="text-[var(--ink)]">{text}</span>
    </div>
  );
}
