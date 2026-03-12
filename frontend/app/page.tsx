 "use client";

import EnterDashboard from "@/components/common/EnterDashboard";
import GoogleLoginButton from "@/components/common/GoogleLoginButton";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/auth.store";

export default function Home() {
  const { user, initialized } = useSelector((state: RootState) => state.auth);
  const isAuthenticated = Boolean(user?._id);

  return (
    <>
      <div className="min-h-screen px-6 py-10 md:px-10 lg:px-16">
        <main className="mx-auto flex w-full max-w-6xl flex-col gap-12">
          <header className="grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
            <div className="flex flex-col gap-5">
              <div className="inline-flex w-fit items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-[11px] uppercase tracking-[0.3em] text-[var(--muted)]">
                SnapPoll
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                Rooms with live chat
              </div>
              <div className="space-y-4">
                <h1 className="max-w-3xl font-[var(--font-display)] text-4xl font-semibold tracking-tight text-[var(--ink)] md:text-6xl">
                  Ask what people think. Watch the votes come in live.
                </h1>
                <p className="max-w-2xl text-sm leading-7 text-[var(--muted)] md:text-base">
                  SnapPoll helps you collect public opinion on any topic and lets people vote on
                  the ideas they care about in one simple room.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                {initialized ? (
                  isAuthenticated ? <EnterDashboard /> : <GoogleLoginButton />
                ) : (
                  <span className="rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm text-[var(--muted)]">
                    Checking session...
                  </span>
                )}
                <span className="text-xs text-[var(--muted)]">
                  {initialized
                    ? isAuthenticated
                      ? "Your session is active. Open the dashboard and manage rooms."
                      : "Sign in with Google to create rooms and join chat as yourself."
                    : "Checking whether you already have an active session."}
                </span>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="glass soft-ring rounded-2xl p-4">
                  <p className="text-xs uppercase tracking-[0.24em] text-[var(--muted)]">Create</p>
                  <p className="mt-2 text-sm text-[var(--ink)]">
                    Open a room with a short question and multiple options in seconds.
                  </p>
                </div>
                <div className="glass soft-ring rounded-2xl p-4">
                  <p className="text-xs uppercase tracking-[0.24em] text-[var(--muted)]">Discuss</p>
                  <p className="mt-2 text-sm text-[var(--ink)]">
                    Keep live chat beside the vote so the decision stays in context.
                  </p>
                </div>
                <div className="glass soft-ring rounded-2xl p-4">
                  <p className="text-xs uppercase tracking-[0.24em] text-[var(--muted)]">Delete</p>
                  <p className="mt-2 text-sm text-[var(--ink)]">
                    Remove finished rooms instead of keeping old polls around.
                  </p>
                </div>
              </div>
            </div>
            <div className="glass soft-ring rounded-[2rem] p-6 md:p-7">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
                    Team workspace
                  </p>
                  <h2 className="mt-2 font-[var(--font-display)] text-2xl font-semibold">
                    One room, one decision
                  </h2>
                </div>
                <span className="rounded-full bg-[var(--panel)] px-3 py-1 text-xs text-[var(--muted)]">
                  Live now
                </span>
              </div>
              <div className="mt-6 space-y-4">
                <div className="rounded-3xl border border-white/15 bg-white/50 p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold">Which launch copy should we ship?</span>
                    <span className="rounded-full bg-[var(--accent)]/15 px-2.5 py-1 text-[11px] font-semibold text-[var(--accent-hover)]">
                      18 votes
                    </span>
                  </div>
                  <div className="mt-4 space-y-3 text-sm">
                    <div>
                      <div className="flex items-center justify-between">
                        <span>Version A</span>
                        <span className="text-[var(--muted)]">50%</span>
                      </div>
                      <div className="mt-1 h-2 rounded-full bg-[var(--panel-2)]">
                        <div className="h-2 w-1/2 rounded-full bg-[var(--accent)]" />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between">
                        <span>Version B</span>
                        <span className="text-[var(--muted)]">33%</span>
                      </div>
                      <div className="mt-1 h-2 rounded-full bg-[var(--panel-2)]">
                        <div className="h-2 w-1/3 rounded-full bg-[var(--accent-2)]" />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between">
                        <span>Version C</span>
                        <span className="text-[var(--muted)]">17%</span>
                      </div>
                      <div className="mt-1 h-2 rounded-full bg-[var(--panel-2)]">
                        <div className="h-2 w-[17%] rounded-full bg-[var(--ink)]/60" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-3xl border border-white/15 bg-white/45 p-4">
                    <p className="text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
                      Fast sharing
                    </p>
                    <p className="mt-2 text-sm text-[var(--ink)]">
                      Send the room code and bring everyone into the same vote instantly.
                    </p>
                  </div>
                  <div className="rounded-3xl border border-white/15 bg-white/45 p-4">
                    <p className="text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
                      Clean closure
                    </p>
                    <p className="mt-2 text-sm text-[var(--ink)]">
                      Poll owners can delete finished rooms directly from the experience.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </header>

          <section className="grid gap-6 md:grid-cols-3">
            <div className="glass soft-ring rounded-2xl p-5">
              <h4 className="font-[var(--font-display)] text-lg font-semibold">Room ownership</h4>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Create a room, invite people, and delete it yourself once the result is final.
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
    </>
  );
}
