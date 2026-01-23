export default function Feedbacks() {
const feedbacks = [
"Eu parei de consumir conteúdo por consumir. Agora eu aplico.",
"Não é motivação. É estrutura.",
"Progresso real, mesmo devagar.",
];


return (
<section className="py-24 px-6 max-w-6xl mx-auto">
<h2 className="text-2xl font-bold mb-12">O que muda na prática.</h2>
<div className="grid md:grid-cols-3 gap-8">
{feedbacks.map((text, i) => (
<div key={i} className="border border-neutral-800 p-6">
<p className="text-neutral-300">{text}</p>
</div>
))}
</div>
</section>
);
}