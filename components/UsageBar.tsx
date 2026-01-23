"use client";

type Props = {
  used: number;
  limit: number;
};

export default function UsageBar({ used, limit }: Props) {
  if (limit === Infinity) {
    return (
      <div className="text-sm text-green-400">
        Ilimitado
      </div>
    );
  }

  const percent = Math.min(
    Math.round((used / limit) * 100),
    100
  );

  let color = "bg-green-500";
  if (percent >= 80) color = "bg-yellow-400";
  if (percent >= 100) color = "bg-red-500";

  return (
    <div className="space-y-1">
      <div className="text-sm text-neutral-400">
        {used} / {limit}
      </div>

      <div className="h-2 w-full bg-neutral-800 rounded">
        <div
          className={`h-2 rounded ${color}`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
