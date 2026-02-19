import React from "react";

interface LegendItemProps {
  color: string;
  label: string;
}

export default function LegendItem({ color, label }: LegendItemProps) {
  return (
    <div className="flex items-center gap-3">
      <div className={`w-5 h-5 border-2 rounded-lg ${color}`}></div>
      <span className="text-[11px] font-black text-gray-500 uppercase tracking-wide">
        {label}
      </span>
    </div>
  );
}
