
import ChatBox from "@/components/chat/ChatBox";
import EnterDashboard from "@/components/common/EnterDashboard";
import PollCard from "@/components/poll/PollCard";

export default function Home() {
  const pollOptions = [
    { label: "Ship onboarding refresh", percentage: 42, votes: 21, accent: "gold" as const },
    { label: "Hold for research", percentage: 58, votes: 29, accent: "mint" as const },
  ];

  const chatMessages = [
    { name: "Priya", text: "Can we ship this week?", tone: "mint" as const },
    { name: "Ravi", text: "I’m voting for onboarding refresh.", tone: "gold" as const },
    { name: "Nora", text: "Let’s run the experiment first.", tone: "muted" as const },
  ];

  return (
    <div className="min-h-screen px-6 py-10 md:px-10 lg:px-16">
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-10">
        <header className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-4">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
              Live poll rooms
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
            </div>
            <h1 className="font-[var(--font-display)] text-4xl font-semibold tracking-tight text-[var(--ink)] md:text-5xl">
              SnapPoll — create a room, watch votes move, chat in the moment.
            </h1>
            <p className="max-w-2xl text-sm text-[var(--muted)] md:text-base">
              A fast, focused space for quick decisions. Each poll is a live room with a
              built-in chat stream and an expiration timer so results stay honest.
            </p>
          </div>
          <div className="glass soft-ring flex w-full max-w-sm flex-col gap-3 rounded-2xl p-4">
            <div className="flex items-center justify-between text-xs text-[var(--muted)]">
              <span>Active rooms</span>
              <span className="rounded-full bg-white/10 px-2 py-0.5">8 live</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span>Design sync poll</span>
              <span className="text-[var(--accent-2)]">02:14 left</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span>Release date</span>
              <span className="text-[var(--accent)]">00:48 left</span>
            </div>
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="glass soft-ring rounded-3xl p-6 md:p-8">
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
                  Create a poll
                </p>
                <h2 className="mt-3 font-[var(--font-display)] text-2xl font-semibold">
                  New room
                </h2>
              </div>
              <div className="rounded-full bg-[var(--accent)] px-3 py-1 text-xs font-semibold text-black">
                15 min
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-xs text-[var(--muted)]">Question</label>
                <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm">
                  Which direction should we ship first?
                </div>
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm">
                  Realtime reporting
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm">
                  Mobile polish
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm">
                  Offline support
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm">
                  AI summaries
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <EnterDashboard />
                <button className="rounded-full border border-white/15 px-5 py-2 text-sm text-[var(--muted)]">
                  Save draft
                </button>
                <span className="text-xs text-[var(--muted)]">Rooms expire automatically.</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <PollCard
              title="Design sync poll"
              roomCode="DP-184"
              timeLeft="02:14 left"
              totalVotes={50}
              options={pollOptions}
            />

            <ChatBox roomName="Design sync poll" messages={chatMessages} typingName="Nora" />
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-3">
          <div className="glass soft-ring rounded-2xl p-5">
            <h4 className="font-[var(--font-display)] text-lg font-semibold">Expiry first</h4>
            <p className="mt-2 text-sm text-[var(--muted)]">
              Every room has a timer so decisions stay crisp and avoid stale votes.
            </p>
          </div>
          <div className="glass soft-ring rounded-2xl p-5">
            <h4 className="font-[var(--font-display)] text-lg font-semibold">Realtime sync</h4>
            <p className="mt-2 text-sm text-[var(--muted)]">
              Vote counts and chat updates appear instantly for everyone in the room.
            </p>
          </div>
          <div className="glass soft-ring rounded-2xl p-5">
            <h4 className="font-[var(--font-display)] text-lg font-semibold">Private rooms</h4>
            <p className="mt-2 text-sm text-[var(--muted)]">
              Share a room code or invite link and keep discussions focused.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
