export default function TypingIndicator({ name }: { name: string }) {
  return (
    <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-[var(--muted)]">
      <span>{name}</span>
      <span>is typing</span>
      <span className="flex items-center gap-1">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--muted)]" />
        <span
          className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--muted)]"
          style={{ animationDelay: "150ms" }}
        />
        <span
          className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--muted)]"
          style={{ animationDelay: "300ms" }}
        />
      </span>
    </div>
  );
}
