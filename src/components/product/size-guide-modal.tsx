"use client";

import { useEffect, useRef } from "react";

interface SizeGuideModalProps {
  open: boolean;
  onClose: () => void;
  gender: "women" | "men" | "unisex";
}

interface SizeRow {
  size: string;
  bust?: string;
  chest?: string;
  waist: string;
  hip?: string;
  shoulder?: string;
}

const womenSizes: SizeRow[] = [
  { size: "XS", bust: "32\"", waist: "26\"", hip: "35\"" },
  { size: "S", bust: "34\"", waist: "28\"", hip: "37\"" },
  { size: "M", bust: "36\"", waist: "30\"", hip: "39\"" },
  { size: "L", bust: "38\"", waist: "32\"", hip: "41\"" },
  { size: "XL", bust: "40\"", waist: "34\"", hip: "43\"" },
];

const menSizes: SizeRow[] = [
  { size: "38", chest: "38\"", waist: "32\"", shoulder: "17.5\"" },
  { size: "40", chest: "40\"", waist: "34\"", shoulder: "18\"" },
  { size: "42", chest: "42\"", waist: "36\"", shoulder: "18.5\"" },
  { size: "44", chest: "44\"", waist: "38\"", shoulder: "19\"" },
  { size: "46", chest: "46\"", waist: "40\"", shoulder: "19.5\"" },
];

export function SizeGuideModal({ open, onClose, gender }: SizeGuideModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key === "Tab" && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0] as HTMLElement;
        const last = focusable[focusable.length - 1] as HTMLElement;
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    closeBtnRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  const sizes = gender === "men" ? menSizes : womenSizes;
  const isMen = gender === "men";

  return (
    <div
      className="fixed inset-0 z-[var(--z-cart-drawer)] flex items-center justify-center p-0 md:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="size-guide-title"
      aria-describedby="size-guide-desc"
    >
      <div
        className="absolute inset-0 bg-[var(--color-overlay)] animate-[fadeIn_200ms_var(--ease-out)_forwards]"
        onClick={onClose}
      />
      <div
        ref={dialogRef}
        tabIndex={-1}
        className="relative bg-[var(--color-surface)] w-full max-w-lg md:max-h-[85vh] md:overflow-y-auto h-full md:h-auto overflow-y-auto p-6 md:p-10 animate-[fadeUp_300ms_var(--ease-out)_forwards]"
      >
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-eyebrow text-[var(--color-accent)] mb-2">Fit Guide</p>
            <h2 id="size-guide-title" className="font-display text-2xl md:text-3xl font-light">
              Size Guide
            </h2>
          </div>
          <button
            ref={closeBtnRef}
            onClick={onClose}
            className="p-2.5 -mr-2 text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-text)] focus-visible:ring-offset-2"
            aria-label="Close size guide"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <p id="size-guide-desc" className="text-body mb-6">
          All measurements are in inches. For made-to-order and bespoke pieces, our team will
          guide you through a personal fitting consultation.
        </p>

        <div className="overflow-x-auto -mx-1 px-1">
          <table className="w-full text-[0.8125rem]">
            <thead>
              <tr className="border-b border-[var(--color-border)]">
                <th className="text-left py-3 text-eyebrow text-[var(--color-text)]">Size</th>
                <th className="text-left py-3 text-eyebrow text-[var(--color-text)]">{isMen ? "Chest" : "Bust"}</th>
                <th className="text-left py-3 text-eyebrow text-[var(--color-text)]">Waist</th>
                <th className="text-left py-3 text-eyebrow text-[var(--color-text)]">{isMen ? "Shoulder" : "Hip"}</th>
              </tr>
            </thead>
            <tbody>
              {sizes.map((row) => (
                <tr key={row.size} className="border-b border-[var(--color-border)]">
                  <td className="py-3 font-medium">{row.size}</td>
                  <td className="py-3 text-[var(--color-text-secondary)]">{isMen ? row.chest ?? "" : row.bust ?? ""}</td>
                  <td className="py-3 text-[var(--color-text-secondary)]">{row.waist}</td>
                  <td className="py-3 text-[var(--color-text-secondary)]">{isMen ? row.shoulder ?? "" : row.hip ?? ""}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 space-y-3">
          <h3 className="text-eyebrow text-[var(--color-text)] mb-3">How to Measure</h3>
          <p className="text-body text-[0.8125rem]">
            <span className="font-medium text-[var(--color-text)]">{isMen ? "Chest" : "Bust"}:</span>{" "}
            Measure around the fullest part of your {isMen ? "chest" : "bust"}, keeping the tape level.
          </p>
          <p className="text-body text-[0.8125rem]">
            <span className="font-medium text-[var(--color-text)]">Waist:</span>{" "}
            Measure around your natural waistline, keeping the tape comfortably loose.
          </p>
          <p className="text-body text-[0.8125rem]">
            <span className="font-medium text-[var(--color-text)]">{isMen ? "Shoulder" : "Hip"}:</span>{" "}
            {isMen
              ? "Measure from edge to edge across the back of your shoulders."
              : "Measure around the fullest part of your hips, approximately 8 inches below your waist."}
          </p>
        </div>

        <p className="mt-8 text-[0.75rem] text-[var(--color-muted)] italic">
          Need help? Book a private consultation for a custom fitting at our atelier.
        </p>
      </div>
    </div>
  );
}
