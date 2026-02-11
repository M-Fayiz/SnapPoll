"use client";

import { useMemo, useState } from "react";
import MessageItem, { MessageItemProps } from "./MessageItem";
import TypingIndicator from "./TypingIndecator";

interface ChatBoxProps {
  roomName: string;
  messages: MessageItemProps[];
  typingName?: string;
  onSend?: (text: string) => Promise<void> | void;
  disabled?: boolean;
  currentUserName?: string;
}

export default function ChatBox({
  roomName,
  messages,
  typingName,
  onSend,
  disabled,
  currentUserName,
}: ChatBoxProps) {
  const [draft, setDraft] = useState("");
  const messageList = useMemo(() => messages.slice(-20), [messages]);

  const handleSend = async () => {
    if (!draft.trim() || !onSend) return;
    const text = draft.trim();
    setDraft("");
    await onSend(text);
  };

  return (
    <div className="glass soft-ring rounded-3xl p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-[var(--muted)]">Chat stream</p>
          <h3 className="mt-3 font-[var(--font-display)] text-xl font-semibold">{roomName}</h3>
        </div>
        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-[var(--muted)]">
          24 online
        </span>
      </div>

      <div className="mt-5 flex max-h-[360px] flex-col gap-3 overflow-y-auto pr-2 text-sm">
        {messageList.map((message, index) => (
          <MessageItem
            key={`${message.name}-${message.text}-${index}`}
            {...message}
            isMine={currentUserName ? message.name === currentUserName : message.isMine}
          />
        ))}
        {typingName ? <TypingIndicator name={typingName} /> : null}
      </div>

      <div className="mt-5 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm">
        <input
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="Type a message…"
          disabled={disabled}
          className="w-full bg-transparent text-[var(--ink)] placeholder:text-[var(--muted)] focus:outline-none disabled:opacity-60"
        />
        <button
          type="button"
          onClick={handleSend}
          disabled={disabled || !onSend}
          className="rounded-full bg-[var(--accent)] px-4 py-1.5 text-xs font-semibold text-black disabled:opacity-60"
        >
          Send
        </button>
      </div>
    </div>
  );
}
