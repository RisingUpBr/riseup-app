import { Suspense } from "react";
import BibliotecaClient from "./BibliotecaClient";

export default function BibliotecaPage() {
  return (
    <Suspense fallback={<div className="p-8">Carregando biblioteca…</div>}>
      <BibliotecaClient />
    </Suspense>
  );
}
