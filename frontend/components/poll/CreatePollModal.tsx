"use client";

import { useState } from "react";
import { CreatePollPayload } from "@/services/poll.service";

interface CreatePollModalProps {
  open: boolean;
  onClose: () => void;
  onCreate: (payload: CreatePollPayload) => Promise<void>;
  defaultUserId?: string;
}

export default function CreatePollModal({ open, onClose, onCreate }: CreatePollModalProps) {
  const [question, setQuestion] = useState("");

  const [options, setOptions] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<{
  question?: string;
  options?: string;
}>({});

  if (!open) return null;

  const handleCreate = async () => {

  const cleanQuestion = question.trim();
  const cleanOptions = options.map((text) => text.trim()).filter(Boolean);

  const newError: {
    question?: string;
    options?: string;
  } = {};

  if (!cleanQuestion) {
    newError.question = "Question is required";
  }

  if (cleanOptions.length < 2) {
    newError.options = "Please enter at least 2 options";
  }

  if (Object.keys(newError).length > 0) {
    setError(newError);
    return;
  }

  setError({});
  setLoading(true);

  try {
    await onCreate({
      question: cleanQuestion,
      options: cleanOptions.map((text) => ({ text }))
    });

    setQuestion("");
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
            <p className="text-xs uppercase tracking-[0.22em] ">Create poll</p>
            <h3 className="mt-3 font-[var(--font-display)] text-xl font-semibold">New room</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs "
          >
            Close
          </button>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-1">
          <label className="flex flex-col gap-2 text-xs ">
            Question
            <input
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              className="rounded-xl border border-white/10 bg-white/15 px-4 py-3 text-sm "
              placeholder="What should we ship first?"
            />
            {error.question && (
            <span className="text-red-400 text-xs">{error.question}</span>
          )}
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
        {error.options && (
          <span className="text-red-400 text-xs">{error.options}</span>
        )}


        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={handleCreate}
            disabled={loading}
            className="rounded-full bg-[var(--accent)] px-5 py-2 text-sm font-semibold text-black disabled:opacity-60"
          >
            {loading ? "Creating..." : "Create room"}
          </button>
          <span className="text-xs ">Needs at least 2 options.</span>
        </div>
      </div>
    </div>
  );
}
