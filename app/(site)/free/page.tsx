"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function FreeRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/recursos");
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-gray-500">Redirecionando...</p>
    </div>
  );
}