"use client";

import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [cursorClass, setCursorClass] = useState("");

  useEffect(() => {
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (isTouchDevice || prefersReducedMotion) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      const target = e.target as HTMLElement;
      const interactive = target.closest("a, button, input, select, textarea, [data-cursor]");

      if (interactive) {
        setCursorClass("cursor-expand");
      } else {
        setCursorClass("");
      }
    };

    const animate = () => {
      cursorX += (mouseX - cursorX) * 0.22;
      cursorY += (mouseY - cursorY) * 0.22;
      cursor.style.left = `${cursorX}px`;
      cursor.style.top = `${cursorY}px`;
      raf = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={cursorRef} className={`cursor-luxury ${cursorClass}`} />
  );
}
