"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Theme = "dark" | "light";
type ThemePreference = "dark" | "light" | "system";

interface ThemeContextType {
  theme: Theme;
  preference: ThemePreference;
  toggleTheme: () => void;
  setTheme: (t: ThemePreference) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("dark");
  const [preference, setPreference] = useState<ThemePreference>("dark");

  useEffect(() => {
    const saved = localStorage.getItem("riseup-theme") as ThemePreference | null;
    const pref: ThemePreference = saved === "light" || saved === "dark" || saved === "system" ? saved : "dark";
    applyTheme(pref);
  }, []);

  function getSystemTheme(): Theme {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function applyTheme(pref: ThemePreference) {
    const resolved: Theme = pref === "system" ? getSystemTheme() : pref;
    setPreference(pref);
    setThemeState(resolved);
    localStorage.setItem("riseup-theme", pref);
    document.documentElement.setAttribute("data-theme", resolved);
  }

  function toggleTheme() {
    applyTheme(theme === "dark" ? "light" : "dark");
  }

  function setTheme(t: ThemePreference) {
    applyTheme(t);
  }

  useEffect(() => {
    if (preference !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => applyTheme("system");
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [preference]);

  return (
    <ThemeContext.Provider value={{ theme, preference, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
}
