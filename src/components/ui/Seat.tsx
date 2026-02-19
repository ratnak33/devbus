import React from "react";
import { clsx } from "clsx";

interface SeatProps {
  id: string;
  selected: boolean;
  isBooked: boolean;
  onClick: () => void;
}

export default function Seat({ id, selected, isBooked, onClick }: SeatProps) {
  return (
    <button
      disabled={isBooked}
      onClick={onClick}
      className={clsx(
        "w-12 h-14 border-2 rounded-xl transition-all relative flex flex-col items-center justify-center overflow-hidden",
        isBooked
          ? "bg-gray-100 border-gray-200 cursor-not-allowed opacity-50"
          : selected
            ? "bg-primary border-primary-dark text-white shadow-lg z-10 scale-105"
            : "bg-white border-gray-300 hover:border-primary hover:shadow-md"
      )}
    >
      {/* Visual headrest detail */}
      <div
        className={clsx(
          "w-8 h-1.5 rounded-full mb-1",
          selected ? "bg-white/40" : "bg-gray-100"
        )}
      ></div>

      <span
        className={clsx(
          "text-[9px] font-black",
          selected ? "text-white" : "text-gray-300"
        )}
      >
        {id.split("-").pop()}
      </span>
    </button>
  );
}
