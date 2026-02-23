import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { type RootState } from "../../store/store";
import { confirmBooking } from "../../store/searchSlice";
import { addBooking } from "../../store/authSlice";
import { User, Mail, Phone, ShieldCheck, Loader2 } from "lucide-react";

export default function PassengerForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { busId } = useParams();

  const selectedSeats = useSelector(
    (state: RootState) => state.booking.selectedSeats
  );
  const totalPrice = useSelector(
    (state: RootState) => state.booking.totalPrice
  );

  const bus = useSelector((state: RootState) =>
    state.search.buses.find((b) => b.id === busId)
  );

  const { date } = useSelector((state: RootState) => state.search);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    setTimeout(() => {
      setIsSubmitting(false);

      if (!bus) return;

      dispatch(
        confirmBooking({
          busId: busId!,
          seats: selectedSeats
        })
      );

      const newBooking = {
        id: `DB-${Math.floor(100000 + Math.random() * 900000)}`,
        busId: busId!,
        source: bus.source,
        destination: bus.destination,
        date: date || new Date().toISOString().split("T")[0],
        price: totalPrice,
        seats: selectedSeats.map((s) => s.split("-").pop()!),
        status: "Confirmed" as const
      };

      dispatch(addBooking(newBooking));

      const ticketData = {
        ...newBooking,
        email: formData.get("email"),
        passengerCount: selectedSeats.length
      };

      navigate("/success", { state: { ticketData } });
    }, 2500);
  };

  return (
    <div className="mt-10 pb-20 relative">
      {isSubmitting && (
        <div className="fixed inset-0 z-[100] bg-white/90 backdrop-blur-md flex flex-col items-center justify-center animate-in fade-in duration-300">
          <div className="relative">
            <Loader2 className="w-16 h-16 text-primary animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-2 h-2 bg-primary rounded-full animate-ping"></div>
            </div>
          </div>
          <h2 className="text-2xl font-black text-gray-800 uppercase tracking-widest mt-6">
            Processing Payment
          </h2>
          <p className="text-gray-500 font-bold mt-2 italic">
            Securing your seats at Zhanrui DevBus...
          </p>
        </div>
      )}

      <div className="flex items-center gap-3 mb-8">
        <div className="bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center font-black shadow-lg shadow-primary/20">
          2
        </div>
        <h2 className="text-2xl font-black text-gray-800 tracking-tight uppercase">
          Passenger Details
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-4">
          {selectedSeats.map((seatId) => (
            <div
              key={seatId}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-wrap md:flex-nowrap items-center gap-6 group hover:border-primary/30 transition-all"
            >
              <div className="bg-gray-50 border border-gray-100 px-4 py-2 rounded-xl text-primary font-black text-sm whitespace-nowrap group-hover:bg-primary group-hover:text-white transition-colors">
                SEAT {seatId.split("-").pop()}
              </div>

              <div className="flex-1 min-w-[200px]">
                <label className="text-[10px] font-black text-gray-400 uppercase mb-1 block">
                  Full Name
                </label>
                <input
                  required
                  name={`name-${seatId}`}
                  type="text"
                  placeholder="Enter Passenger Name"
                  className="w-full border-b-2 border-gray-100 focus:border-primary outline-none py-2 font-bold text-gray-700 transition-colors bg-transparent"
                />
              </div>

              <div className="w-24">
                <label className="text-[10px] font-black text-gray-400 uppercase mb-1 block">
                  Age
                </label>
                <input
                  required
                  name={`age-${seatId}`}
                  type="number"
                  placeholder="25"
                  className="w-full border-b-2 border-gray-100 focus:border-primary outline-none py-2 font-bold text-gray-700 transition-colors bg-transparent"
                />
              </div>

              <div className="w-32">
                <label className="text-[10px] font-black text-gray-400 uppercase mb-1 block">
                  Gender
                </label>
                <select
                  name={`gender-${seatId}`}
                  className="w-full border-b-2 border-gray-100 focus:border-primary outline-none py-2 font-bold text-gray-700 bg-transparent cursor-pointer"
                >
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-secondary rounded-[2.5rem] p-8 md:p-12 text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <ShieldCheck className="w-32 h-32" />
          </div>

          <h3 className="text-xl font-black mb-10 flex items-center gap-3">
            <Mail className="w-6 h-6 text-primary" />
            Contact Information
          </h3>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="group">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block group-focus-within:text-primary transition-colors">
                Email Address
              </label>
              <input
                required
                name="email"
                type="email"
                placeholder="traveler@taiwan.tw"
                className="w-full bg-transparent border-b-2 border-white/10 focus:border-primary outline-none py-2 font-bold text-white transition-all"
              />
              <p className="text-[9px] text-white/30 mt-2 uppercase font-bold tracking-tighter">
                Your ticket will be sent here
              </p>
            </div>

            <div className="group">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block group-focus-within:text-primary transition-colors">
                Phone Number
              </label>
              <div className="flex items-center gap-3 border-b-2 border-white/10 focus-within:border-primary transition-all">
                <span className="font-bold text-white/40 text-lg">+886</span>
                <input
                  required
                  name="phone"
                  type="tel"
                  placeholder="912 345 678"
                  className="w-full bg-transparent outline-none py-2 font-bold text-white"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-8 border-t border-gray-100">
          <div className="flex items-center gap-3 text-gray-400 text-xs">
            <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-green-500" />
            </div>
            <p className="max-w-[200px] leading-tight font-medium">
              Safe and Secure 256-bit SSL Encrypted Payment
            </p>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full md:w-auto bg-primary hover:bg-primary-dark text-white px-20 py-5 rounded-2xl font-black text-xl shadow-2xl shadow-primary/30 transition-all hover:-translate-y-1 active:scale-95 disabled:opacity-50 disabled:grayscale"
          >
            {isSubmitting ? "SECURE PAYING..." : `PAY NT$ ${totalPrice} & BOOK`}
          </button>
        </div>
      </form>
    </div>
  );
}
