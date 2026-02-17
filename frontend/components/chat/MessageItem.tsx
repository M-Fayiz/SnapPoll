export interface MessageItemProps {
  name: string;
  text: string;
  isMine?: boolean;
}

export default function MessageItem({ name, text, isMine }: MessageItemProps) {
  return (
    <div className={`flex ${isMine ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${
          isMine
            ? "bg-[var(--accent)] text-black"
            : "border border-black/10 bg-white text-[var(--ink)]"
        }`}
      >
        <div className={`text-xs ${isMine ? "text-black/70" : "text-[var(--muted)]"}`}>{name}</div>
        <div className="mt-1">{text}</div>
      </div>
    </div>
  );
}
