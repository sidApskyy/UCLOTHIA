"use client";

import { useState } from "react";

export function NewsletterForm() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const email = new FormData(form).get("email") as string;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error");
      return;
    }

    setStatus("success");
    form.reset();
    setTimeout(() => setStatus("idle"), 4000);
  };

  return (
    <div className="w-full">
      <form
        className="flex flex-col sm:flex-row gap-3"
        onSubmit={handleSubmit}
      >
        <input
          type="email"
          name="email"
          placeholder="Your email address"
          className="flex-1 bg-transparent border-b border-white/30 py-3 text-[0.9375rem] text-white placeholder:text-white/40 focus:border-white/60 outline-none transition-colors"
          aria-label="Email address"
          required
        />
        <button
          type="submit"
          className="text-[0.75rem] font-medium tracking-[0.15em] uppercase text-white border border-white/30 px-6 py-3 hover:bg-white hover:text-[var(--color-text)] transition-colors duration-[var(--duration-fast)]"
        >
          Subscribe
        </button>
      </form>
      {status === "success" && (
        <p className="mt-3 text-[0.75rem] text-white/70 tracking-[0.05em]">
          Thank you. You will receive our next collection story.
        </p>
      )}
      {status === "error" && (
        <p className="mt-3 text-[0.75rem] text-white/50 tracking-[0.05em]">
          Please enter a valid email address.
        </p>
      )}
    </div>
  );
}
