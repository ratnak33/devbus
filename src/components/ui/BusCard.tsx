import React from "react";
import { Star, Clock, Wifi, Coffee, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Bus } from "../../types/bus";

interface BusCardProps {
  bus: Bus;
}

export default function BusCard({ bus }: BusCardProps) {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
      {/* 1. Bus Name and Rating */}
      <div className="flex-1 min-w-[220px]">
        <div className="flex items-center gap-3 mb-1">
          <h3 className="text-xl font-bold text-gray-800">{bus.name}</h3>
          <div className="flex items-center gap-1 bg-green-600 text-white px-2 py-0.5 rounded text-xs font-bold">
            <Star className="w-3 h-3 fill-current" />
            <span>{bus.rating}</span>
          </div>
        </div>
        <p className="text-gray-500 text-sm font-medium uppercase">
          {bus.type}
        </p>

        <div className="flex gap-4 mt-4 text-gray-400">
          <Wifi className="w-4 h-4" />
          <Coffee className="w-4 h-4" />
          <div className="flex items-center gap-1 text-[11px] font-semibold text-primary/80 uppercase">
            <MapPin className="w-3 h-3" />
            <span>Live Tracking</span>
          </div>
        </div>
      </div>

      {/* 2. Timeline */}
      <div className="flex items-center gap-10 text-center flex-1 justify-center border-x border-gray-50 px-6">
        <div>
          <p className="text-xl font-black text-gray-800">
            {bus.departureTime}
          </p>
          <p className="text-xs font-bold text-gray-400 uppercase">
            {bus.source}
          </p>
        </div>

        <div className="flex flex-col items-center gap-1">
          <p className="text-[10px] font-bold text-gray-400">{bus.duration}</p>
          <div className="w-24 h-[2px] bg-gray-200 relative">
            <div className="absolute -top-1 left-0 w-2 h-2 bg-gray-300 rounded-full"></div>
            <div className="absolute -top-1 right-0 w-2 h-2 bg-gray-300 rounded-full"></div>
          </div>
        </div>

        <div>
          <p className="text-xl font-black text-gray-800">{bus.arrivalTime}</p>
          <p className="text-xs font-bold text-gray-400 uppercase">
            {bus.destination}
          </p>
        </div>
      </div>

      {/* 3. Pricing and Navigation Button */}
      <div className="flex flex-col items-end min-w-[160px] gap-3">
        <div className="text-right">
          <p className="text-3xl font-black text-secondary">
            <span className="text-sm font-medium mr-1">NT$</span>
            {bus.price}
          </p>
          <p className="text-green-600 text-[10px] font-black uppercase bg-green-50 px-2 py-0.5 rounded">
            Best Price
          </p>
        </div>

        <button
          onClick={() => navigate(`/book/${bus.id}`)}
          className="w-full bg-primary text-white font-bold py-3 px-6 rounded-lg transition-all hover:bg-primary-dark shadow-md active:scale-95"
        >
          Select Seats
        </button>
        <p className="text-[11px] font-bold text-gray-400 italic">
          {bus.seatsAvailable} Seats left
        </p>
      </div>
    </div>
  );
}
