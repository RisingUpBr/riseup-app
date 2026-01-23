import Link from "next/link";

export default function UpgradeCTA({ feature }: { feature: string }) {
  return (
    <div className="rounded-xl border p-6 text-center">
      <h3 className="font-semibold mb-2">
        Limite atingido
      </h3>
      <p className="text-sm text-muted-foreground mb-4">
        Para continuar usando <b>{feature}</b>, faça upgrade do seu plano.
      </p>
      <Link
        href="/planos"
        className="inline-block rounded bg-black px-4 py-2 text-white"
      >
        Fazer upgrade
      </Link>
    </div>
  );
}
