"use client";

import UsageBar from "./UsageBar";

type Props = {
  label: string;
  description: string;
  used: number;
  limit: number;
};

export default function FeatureUsageCard({
  label,
  description,
  used,
  limit,
}: Props) {
  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 space-y-2">
      <div>
        <h3 className="font-medium text-white">
          {label}
        </h3>
        <p className="text-sm text-neutral-400">
          {description}
        </p>
      </div>

      <UsageBar used={used} limit={limit} />
    </div>
  );
}
