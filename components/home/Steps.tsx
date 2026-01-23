export default function Steps() {
const steps = [
{ title: "Entre em contato", desc: "Explore conteúdos e ferramentas." },
{ title: "Organize a mente", desc: "Ganhe clareza e foco." },
{ title: "Execute", desc: "Aja com intenção." },
];


return (
<section className="py-24 px-6 max-w-4xl mx-auto">
<h2 className="text-2xl font-bold mb-12 text-center">Começar é simples.</h2>
<div className="space-y-10">
{steps.map((step, i) => (
<div key={i} className="flex gap-6">
<span className="text-yellow-400 font-bold">{i + 1}</span>
<div>
<h3 className="font-semibold">{step.title}</h3>
<p className="text-neutral-400">{step.desc}</p>
</div>
</div>
))}
</div>
</section>
);
}