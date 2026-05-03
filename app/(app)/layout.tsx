"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthUser } from "@/hooks/useAuthUser";
import { useTheme } from "@/contexts/ThemeContext";
import Sidebar from "@/components/Sidebar";
import { updateStreak } from "@/lib/streakService";

function AppShell({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  return (
    <div
      className="flex h-screen overflow-hidden"
      style={{ background: "var(--app-bg)" }}
    >
      <Sidebar />
      <main className="flex-1 ml-64 overflow-y-auto" style={{ background: "var(--app-bg)" }}>
        {children}
      </main>
    </div>
  );
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user, userData, loading } = useAuthUser();

  useEffect(() => {
    if (loading) return;
    if (!user) { router.push("/auth"); return; }
    if (userData && userData.onboardingCompleted === false) {
      router.push("/onboarding");
    }
  }, [user, userData, loading, router]);

  useEffect(() => {
    if (user?.uid) {
      updateStreak(user.uid).catch(console.error);
    }
  }, [user?.uid]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--app-bg)" }}>
        <div className="w-7 h-7 rounded-full border-2 border-[#D4AF37] border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <AppShell>
      {children}
    </AppShell>
  );
}
