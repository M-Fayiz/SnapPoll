import EnterDashboard from "@/components/common/EnterDashboard";
import GoogleLoginButton from "@/components/common/GoogleLoginButton";

export default function Home() {
  return (
    <div className="min-h-screen px-6 py-10 md:px-10 lg:px-16">
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-12">
        <header className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="flex flex-col gap-3">
            <div className="font-[var(--font-display)] text-4xl font-semibold tracking-[0.08em] text-[var(--ink)] md:text-6xl">
              SnapPoll
            </div>
            <div className="inline-flex w-fit items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-[11px] uppercase tracking-[0.3em] text-[var(--muted)]">
              Live poll rooms
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
              Real-time chat
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <h1 className="font-[var(--font-display)] text-4xl font-semibold tracking-tight text-[var(--ink)] md:text-5xl">
              SnapPoll turns group decisions into a clean, real-time room.
            </h1>
            <p className="max-w-2xl text-sm text-[var(--muted)] md:text-base">
              Create a room in seconds, share a short code, and watch results move instantly.
              Polls expire automatically so outcomes stay current and focused.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <EnterDashboard />
              <GoogleLoginButton />
              <span className="text-xs text-[var(--muted)]">
                Sign in to save rooms and show your name in chat.
              </span>
            </div>
          </div>
          <div className="glass soft-ring rounded-3xl p-6">
            <div className="flex items-center justify-between text-xs text-[var(--muted)]">
              <span>Today</span>
              <span className="rounded-full bg-white/10 px-2 py-0.5">3 active rooms</span>
            </div>
            <div className="mt-4 flex flex-col gap-3 text-sm">
              <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <span>Design sync</span>
                <span className="text-[var(--accent-2)]">04:20 left</span>
              </div>
              <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <span>Release date</span>
                <span className="text-[var(--accent)]">01:05 left</span>
              </div>
              <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <span>Hiring vote</span>
                <span className="text-[var(--muted)]">Closed</span>
              </div>
            </div>
          </div>
        </header>

        <section className="grid gap-6 md:grid-cols-3">
          <div className="glass soft-ring rounded-2xl p-5">
            <h4 className="font-[var(--font-display)] text-lg font-semibold">Expiry timer</h4>
            <p className="mt-2 text-sm text-[var(--muted)]">
              Time-boxed polls keep momentum high and prevent stale decisions.
            </p>
          </div>
          <div className="glass soft-ring rounded-2xl p-5">
            <h4 className="font-[var(--font-display)] text-lg font-semibold">Live chat</h4>
            <p className="mt-2 text-sm text-[var(--muted)]">
              Discuss options inline without losing the voting context.
            </p>
          </div>
          <div className="glass soft-ring rounded-2xl p-5">
            <h4 className="font-[var(--font-display)] text-lg font-semibold">Instant results</h4>
            <p className="mt-2 text-sm text-[var(--muted)]">
              Votes update immediately for everyone in the room.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
