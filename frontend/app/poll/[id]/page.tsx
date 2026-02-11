import PollDetailClient from "@/components/poll/PollDetailClient";

export default async function PollDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <div className="min-h-screen px-6 py-10 md:px-10 lg:px-16">
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <header className="flex flex-col gap-3">
          <p className="text-xs uppercase tracking-[0.22em] text-[var(--muted)]">Poll detail</p>
          <h1 className="font-[var(--font-display)] text-3xl font-semibold">Live room</h1>
        </header>
        <PollDetailClient pollId={id} />
      </main>
    </div>
  );
}
