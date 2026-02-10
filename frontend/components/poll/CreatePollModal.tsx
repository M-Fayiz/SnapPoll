"use client";

import { useState } from "react";
import { CreatePollPayload } from "@/services/poll.service";

interface CreatePollModalProps {
  open: boolean;
  onClose: () => void;
  onCreate: (payload: CreatePollPayload) => Promise<void>;
  defaultUserId?: string;
}

export default function CreatePollModal({
  open,
  onClose,
  onCreate,
  defaultUserId,
}: CreatePollModalProps) {
  const [question, setQuestion] = useState("");
  const [roomId, setRoomId] = useState("");
  const [expiresAt, setExpiresAt] = useState("");
  const [createdBy, setCreatedBy] = useState(defaultUserId || "demo-user");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handleCreate = async () => {
    const cleanOptions = options.map((text) => text.trim()).filter(Boolean);
    if (!question.trim() || !roomId.trim() || !createdBy.trim() || cleanOptions.length < 2 || !expiresAt) {
      return;
    }
    setLoading(true);
    try {
      await onCreate({
        question: question.trim(),
        roomId: roomId.trim(),
        createdBy: createdBy.trim(),
        options: cleanOptions.map((text) => ({ text })),
        expiresAt,
      });
      setQuestion("");
      setRoomId("");
      setExpiresAt("");
      setOptions(["", "", "", ""]);
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-6">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="glass soft-ring relative z-10 w-full max-w-2xl rounded-3xl p-6">
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] ">
              Create poll
            </p>
            <h3 className="mt-3 font-[var(--font-display)] text-xl font-semibold">
              New room
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs "
          >
            Close
          </button>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <label className="flex flex-col gap-2 text-xs ">
            Question
            <input
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm "
              placeholder="What should we ship first?"
            />
          </label>
          <label className="flex flex-col gap-2 text-xs ">
            Room code
            <input
              value={roomId}
              onChange={(event) => setRoomId(event.target.value)}
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm "
              placeholder="DP-184"
            />
          </label>
          <label className="flex flex-col gap-2 text-xs ">
            Expires at
            <input
              type="datetime-local"
              value={expiresAt}
              onChange={(event) => setExpiresAt(event.target.value)}
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm "
            />
          </label>
          <label className="flex flex-col gap-2 text-xs ">
            User id
            <input
              value={createdBy}
              onChange={(event) => setCreatedBy(event.target.value)}
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm "
              placeholder="demo-user"
            />
          </label>
        </div>

        <div className="mt-6 grid gap-3 md:grid-cols-2">
          {options.map((value, index) => (
            <input
              key={`opt-${index}`}
              value={value}
              onChange={(event) => {
                const next = [...options];
                next[index] = event.target.value;
                setOptions(next);
              }}
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm "
              placeholder={`Option ${index + 1}`}
            />
          ))}
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={handleCreate}
            disabled={loading}
            className="rounded-full bg-[var(--accent)] px-5 py-2 text-sm font-semibold text-black disabled:opacity-60"
          >
            {loading ? "Creating..." : "Create room"}
          </button>
          <span className="text-xs ">
            Needs at least 2 options.
          </span>
        </div>
      </div>
    </div>
  );
}
