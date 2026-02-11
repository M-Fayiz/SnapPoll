"use client";

import { authService } from "@/services/auth.service";

export default function GoogleLoginButton() {
  return (
    <a
      href={authService.loginUrl()}
      className="rounded-full border border-white/20 bg-white/5 px-5 py-2 text-sm font-semibold text-[var(--ink)]"
    >
      Continue with Google
    </a>
  );
}
