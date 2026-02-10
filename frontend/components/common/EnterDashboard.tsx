import Link from "next/link";

export default function EnterDashboard() {
  return (
    <Link
      href="/dashboard"
      className="rounded-full bg-[var(--accent)] px-5 py-2 text-sm font-semibold text-black"
    >
      Enter dashboard
    </Link>
  );
}
