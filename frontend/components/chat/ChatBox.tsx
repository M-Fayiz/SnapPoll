"use client";

import { useMemo, useState, useRef, useEffect } from "react";
import MessageItem, { MessageItemProps } from "./MessageItem";
import TypingIndicator from "./TypingIndecator";

interface ChatBoxProps {
  roomName: string;
  messages: MessageItemProps[];
  typingName?: string;
  onSend?: (text: string) => Promise<void> | void;
  disabled?: boolean;
}

export default function ChatBox({
  roomName,
  messages,
  typingName,
  onSend,
  disabled,
}: ChatBoxProps) {

  const [draft, setDraft] = useState("");
  const messageList = useMemo(() => messages.slice(-20), [messages]);

  // ⭐ auto scroll (professional feature)
  const bottomRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messageList]);

  const handleSend = async () => {
    if (!draft.trim() || !onSend) return;
    const text = draft.trim();
    setDraft("");
    await onSend(text);
  };

  return (
    <div className="glass soft-ring rounded-3xl p-6">

      {/* HEADER */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
            Chat stream
          </p>
          <h3 className="mt-3 font-[var(--font-display)] text-xl font-semibold">
            {roomName}
          </h3>
        </div>

        {/* ⭐ LIGHT THEME FIX */}
        <span className="rounded-full border border-black/10 bg-black/[0.04] px-3 py-1 text-xs text-[var(--muted)]">
          24 online
        </span>
      </div>


      {/* MESSAGE LIST */}
      <div className="mt-5 flex max-h-[360px] flex-col gap-3 overflow-y-auto pr-2 text-sm">

        {messageList.map((message, index) => (
          <MessageItem
            key={`${message.name}-${message.text}-${index}`}
            {...message}
            isMine={message.isMine}
          />
        ))}

        {typingName ? <TypingIndicator name={typingName} /> : null}

        {/* ⭐ for auto-scroll */}
        <div ref={bottomRef} />
      </div>


      {/* INPUT AREA */}
      <div className="mt-5 flex items-center gap-3 rounded-2xl border border-black/10 bg-black/[0.04] px-4 py-3 text-sm">

        <input
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="Type a message…"
          disabled={disabled}
          
          // ⭐ ENTER TO SEND (important UX)
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSend();
          }}

          className="w-full bg-transparent text-[var(--ink)] placeholder:text-[var(--muted)] focus:outline-none disabled:opacity-60"
        />

        <button
          type="button"
          onClick={handleSend}
          disabled={disabled || !onSend}
          className="rounded-full bg-[var(--accent)] px-4 py-1.5 text-xs font-semibold text-white hover:opacity-90 disabled:opacity-60"
        >
          Send
        </button>

      </div>

    </div>
  );
}
