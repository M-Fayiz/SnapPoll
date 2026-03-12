"use client";

import { useEffect, useState } from "react";
import CreatePollModal from "@/components/poll/CreatePollModal";
import PollList from "@/components/poll/PollList";
import { pollService, Poll } from "@/services/poll.service";
import { authService } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store/auth.store";
import type { AppDispatch } from "@/store/auth.store";
import { logOut } from "@/slicer/authSlicer";

export default function DashboardPage() {
  const [polls, setPolls] = useState<Poll[]>([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { user, initialized } = useSelector((state: RootState) => state.auth);
  const isAuthenticated = Boolean(user?._id);

  useEffect(() => {
    if (!initialized) return;

    if (!isAuthenticated) {
      router.replace("/");
      return;
    }

    const load = async () => {
      pollService
        .list()
        .then(setPolls)
        .catch(() => setPolls([]))
        .finally(() => setLoading(false));
    };

    load();
  }, [initialized, isAuthenticated, router]);

  if (!initialized) {
    return (
      <div className="min-h-screen px-6 py-10 md:px-10 lg:px-16">
        <main className="mx-auto flex w-full max-w-6xl flex-col gap-8">
          <div className="glass soft-ring rounded-3xl p-6 text-sm text-[var(--muted)]">
            Checking session...
          </div>
        </main>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const handleLogout = async () => {
    if (loggingOut) return;
    setLoggingOut(true);
    try {
      await authService.logout();
    } finally {
      dispatch(logOut());
      router.replace("/");
      setLoggingOut(false);
    }
  };

  return (
    <div className="min-h-screen px-6 py-10 md:px-10 lg:px-16">
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-[var(--muted)]">Dasboard</p>
            <h1 className="mt-3 font-[var(--font-display)] text-3xl font-semibold">Poll rooms</h1>
            <p className="mt-2 text-sm text-[var(--muted)]">
              View all active and expired rooms across your team.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-[var(--ink)]">
              <span>{user.name}</span>
              <span className="text-[var(--muted)]">{user.email}</span>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              disabled={loggingOut}
              className="rounded-full border border-black/10 bg-white px-5 py-2 text-sm font-semibold text-[var(--ink)] hover:bg-black/[0.03] disabled:opacity-60"
            >
              {loggingOut ? "Logging out..." : "Logout"}
            </button>
            <button
              type="button"
              onClick={() => setOpenModal(true)}
              className="rounded-full bg-[var(--accent)] px-5 py-2 text-sm font-semibold text-black"
            >
              Create poll
            </button>
          </div>
        </header>

        {loading ? (
          <div className="glass soft-ring rounded-3xl p-6 text-sm text-[var(--muted)]">
            Loading polls...
          </div>
        ) : (
          <PollList polls={polls} />
        )}
      </main>

      <CreatePollModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        defaultUserId={user?._id || ""}
        onCreate={async (payload) => {
          const created = await pollService.create(payload);
          setPolls((prev) => [created, ...prev]);
        }}
      />
    </div>
  );
}
