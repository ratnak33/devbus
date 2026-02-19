import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleSeat } from "../../store/bookingSlice";
import { type RootState } from "../../store/store";
import { User, Info } from "lucide-react";

import Seat from "./Seat";
import LegendItem from "./LegendItem";

interface SeatMapProps {
  busId: string;
  basePrice: number;
  onConfirm: () => void;
}

export default function SeatMap({ busId, basePrice, onConfirm }: SeatMapProps) {
  const dispatch = useDispatch();

  const selectedSeats = useSelector(
    (state: RootState) => state.booking.selectedSeats
  );

  const bus = useSelector((state: RootState) =>
    state.search.buses.find((b) => b.id === busId)
  );

  const permanentlyBookedSeats = bus?.bookedSeats || [];
  const rows = Array.from({ length: 10 }, (_, i) => i + 1);

  const handleSeatClick = (seatId: string) => {
    dispatch(toggleSeat({ seatId, price: basePrice }));
  };

  return (
    <div className="bg-white p-6 md:p-10 rounded-2xl border border-gray-100 shadow-sm animate-in fade-in zoom-in duration-300">
      <div className="flex flex-col lg:flex-row gap-12 justify-center items-start">
        {/* BUS CHASSIS */}
        <div className="relative bg-gray-50 border-[3px] border-gray-200 rounded-[50px] p-8 pt-28 w-full max-w-[320px] shadow-inner">
          <div className="absolute top-0 left-0 right-0 h-24 border-b-2 border-dashed border-gray-200 flex items-center justify-between px-10">
            <div className="flex flex-col items-center gap-1 text-gray-400">
              <div className="w-10 h-10 border-2 border-gray-300 rounded-full flex items-center justify-center">
                <User className="w-6 h-6" />
              </div>
              <span className="text-[8px] font-black uppercase tracking-tighter">
                Captain
              </span>
            </div>
            <div className="w-10 h-10 rounded-full border-4 border-gray-300 flex items-center justify-center">
              <div className="w-1 h-6 bg-gray-300 rounded-full rotate-45"></div>
            </div>
          </div>

          {/* 2 + 1 Seat Layout */}
          <div className="grid grid-cols-4 gap-x-4 gap-y-4">
            {rows.map((row) => (
              <React.Fragment key={`row-${row}`}>
                <Seat
                  id={`${busId}-${row}A`}
                  selected={selectedSeats.includes(`${busId}-${row}A`)}
                  isBooked={permanentlyBookedSeats.includes(`${busId}-${row}A`)}
                  onClick={() => handleSeatClick(`${busId}-${row}A`)}
                />
                <Seat
                  id={`${busId}-${row}B`}
                  selected={selectedSeats.includes(`${busId}-${row}B`)}
                  isBooked={permanentlyBookedSeats.includes(`${busId}-${row}B`)}
                  onClick={() => handleSeatClick(`${busId}-${row}B`)}
                />

                <div className="flex items-center justify-center text-[10px] text-gray-300 font-bold italic">
                  {row}
                </div>

                <Seat
                  id={`${busId}-${row}C`}
                  selected={selectedSeats.includes(`${busId}-${row}C`)}
                  isBooked={permanentlyBookedSeats.includes(`${busId}-${row}C`)}
                  onClick={() => handleSeatClick(`${busId}-${row}C`)}
                />
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* BOOKING SUMMARY PANEL */}
        <div className="flex-1 w-full max-w-md space-y-8">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Info className="w-5 h-5 text-primary" />
              <h3 className="font-black text-gray-800 uppercase tracking-tight">
                Seat Legend
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <LegendItem color="bg-white border-gray-300" label="Available" />
              <LegendItem color="bg-gray-200 border-gray-300" label="Booked" />
              <LegendItem
                color="bg-primary border-primary-dark shadow-sm shadow-primary/20"
                label="Selected"
              />
            </div>
          </div>

          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">
              Your Selection
            </p>
            <div className="flex flex-wrap gap-2 min-h-[48px]">
              {selectedSeats.length > 0 ? (
                selectedSeats.map((s) => (
                  <span
                    key={s}
                    className="bg-secondary text-white px-4 py-2 rounded-xl text-xs font-black shadow-md animate-in zoom-in"
                  >
                    {s.split("-").pop()}
                  </span>
                ))
              ) : (
                <span className="text-gray-400 text-sm italic">
                  Tap on a seat to select it (Max 6)
                </span>
              )}
            </div>
          </div>

          <div className="border-t border-gray-100 pt-8">
            <div className="flex justify-between items-center mb-8">
              <span className="text-gray-500 font-bold uppercase text-xs tracking-widest">
                Total Payable
              </span>
              <span className="text-4xl font-black text-secondary tracking-tighter">
                <span className="text-lg mr-1 font-bold">NT$</span>
                {useSelector((state: RootState) => state.booking.totalPrice)}
              </span>
            </div>

            <button
              disabled={selectedSeats.length === 0}
              onClick={onConfirm}
              className="w-full bg-primary hover:bg-primary-dark text-white py-5 rounded-2xl font-black text-xl transition-all shadow-xl shadow-primary/20 disabled:opacity-20 active:scale-95 flex items-center justify-center gap-3"
            >
              CONFIRM SEATS
            </button>
            <p className="text-center text-[10px] text-gray-400 mt-4 font-bold uppercase tracking-widest">
              Safe & Secure Booking Guaranteed
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
