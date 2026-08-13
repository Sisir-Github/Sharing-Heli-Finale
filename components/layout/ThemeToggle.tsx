"use client";

import { Moon, Sun } from "lucide-react";

type ThemeMode = "dark" | "light";

function applyTheme(theme: ThemeMode) {
  document.documentElement.setAttribute("data-theme", theme);
}

export function ThemeToggle({ className = "" }: { className?: string }) {
  return (
    <button
      type="button"
      className={`theme-toggle inline-flex items-center justify-center rounded-lg text-sm font-semibold transition-all ${className}`.trim()}
      onClick={() => {
        const nextTheme: ThemeMode = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
        localStorage.setItem("sharing-heli-theme", nextTheme);
        applyTheme(nextTheme);
      }}
      aria-label="Switch color theme"
      title="Switch color theme"
    >
      <Moon size={22} className="theme-switch-to-dark" />
      <Sun size={22} className="theme-switch-to-light" />
    </button>
  );
}
