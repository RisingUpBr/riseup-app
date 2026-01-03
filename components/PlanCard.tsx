"use client";

type PlanCardProps = {
  title: string;
  price: string;
  description: string;
  features: string[];
  highlight?: boolean;
  buttonText: string;
  onClick: () => void;
};

export function PlanCard({
  title,
  price,
  description,
  features,
  highlight,
  buttonText,
  onClick,
}: PlanCardProps) {
  return (
    <div
      className={`border rounded-xl p-6 flex flex-col justify-between ${
        highlight
          ? "border-yellow-400 shadow-lg scale-105"
          : "border-gray-300"
      }`}
    >
      <div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-3xl font-extrabold mb-2">{price}</p>
        <p className="text-sm text-gray-500 mb-4">{description}</p>

        <ul className="space-y-2 text-sm">
          {features.map((f, i) => (
            <li key={i}>✔ {f}</li>
          ))}
        </ul>
      </div>

      <button
        onClick={onClick}
        className={`mt-6 py-2 rounded font-semibold ${
          highlight
            ? "bg-black text-yellow-400"
            : "bg-gray-800 text-white"
        }`}
      >
        {buttonText}
      </button>
    </div>
  );
}
