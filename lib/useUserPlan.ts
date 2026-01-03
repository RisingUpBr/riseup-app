import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuthUser } from "@/lib/useAuthUser";

type InfoproductLevel = "free" | "basico" | "essencial" | "pro";

export function useUserPlan() {
  const { user, loading: authLoading } = useAuthUser();

  const [loading, setLoading] = useState(true);
  const [plan, setPlan] = useState<string | null>(null);
  const [isPremium, setIsPremium] = useState(false);
  const [infoproductLevel, setInfoproductLevel] =
    useState<InfoproductLevel>("free");

  useEffect(() => {
    if (!user) {
      setPlan(null);
      setIsPremium(false);
      setInfoproductLevel("free");
      setLoading(false);
      return;
    }

    const ref = doc(db, "users", user.uid);

    const unsub = onSnapshot(ref, (snap) => {
      const data = snap.data();

      const stripe = data?.stripe;

      if (stripe?.status === "active") {
        setIsPremium(true);
        setPlan(stripe.plan ?? null);
      } else {
        setIsPremium(false);
        setPlan(null);
      }

      setInfoproductLevel(
        data?.entitlements?.infoprodutos ?? "free"
      );

      setLoading(false);
    });

    return () => unsub();
  }, [user]);

  return {
    loading: authLoading || loading,

    // acesso ao app
    isPremium,

    // mensal | anual | quinzenal | null
    plan,

    // infoprodutos
    infoproductLevel,
  };
}
