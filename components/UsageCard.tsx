"use client";

type UsageCardProps = {
  title: string;
  used: number;
  limit: number | "∞";
};

export function UsageCard({ title, used, limit }: UsageCardProps) {
  const percentage =
    limit === "∞" ? 100 : Math.min((used / limit) * 100, 100);

  return (
    <div className="border rounded-lg p-4 bg-white shadow-sm">
      <h3 className="font-semibold mb-2">{title}</h3>

      <div className="text-sm mb-1">
        {limit === "∞" ? "Ilimitado" : `${used} / ${limit}`}
      </div>

      <div className="w-full h-2 bg-gray-200 rounded">
        <div
          className="h-2 bg-black rounded"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
