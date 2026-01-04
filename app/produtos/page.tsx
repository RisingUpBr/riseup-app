import { Suspense } from "react";
import ProdutosClient from "./ProdutosClient";

export default function ProdutosPage() {
  return (
    <Suspense fallback={<div className="p-8">Carregando produtos…</div>}>
      <ProdutosClient />
    </Suspense>
  );
}
