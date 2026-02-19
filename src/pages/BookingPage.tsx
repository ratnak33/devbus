import React, { useState, useEffect } from "react";
import {
  useParams,
  useNavigate,
  Navigate,
  useLocation
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { type RootState } from "../store/store";
import SeatMap from "../components/ui/SeatMap";
import PassengerForm from "../features/booking/PassengerForm";
import { resetBooking } from "../store/bookingSlice";
import { ChevronLeft, CheckCircle2 } from "lucide-react";

export default function BookingPage() {
  const { busId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [step, setStep] = useState(1);

  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  const bus = useSelector((state: RootState) =>
    state.search.buses.find((b) => b.id === busId)
  );
  const selectedSeats = useSelector(
    (state: RootState) => state.booking.selectedSeats
  );

  useEffect(() => {
    dispatch(resetBooking());
  }, [dispatch]);

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!bus)
    return <div className="p-20 text-center font-bold">Bus not found...</div>;

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-20">
      <div className="bg-white border-b border-gray-100 pt-12 pb-8 sticky top-16 z-40 shadow-sm">
        <div className="max-w-xl mx-auto px-6">
          <div className="relative">
            <div
              className="absolute inset-0 flex items-center"
              aria-hidden="true"
            >
              <div className="w-full h-[2px] bg-gray-100"></div>
            </div>

            <div
              className="absolute inset-0 flex items-center"
              aria-hidden="true"
            >
              <div
                className="h-[2px] bg-primary transition-all duration-700 ease-in-out"
                style={{ width: step === 1 ? "0%" : "100%" }}
              ></div>
            </div>

            <div className="relative flex justify-between">
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 border-2 z-10 ${
                    step >= 1
                      ? "bg-primary border-primary text-white shadow-lg"
                      : "bg-white border-gray-200 text-gray-400"
                  }`}
                >
                  {step > 1 ? <CheckCircle2 className="w-5 h-5" /> : "1"}
                </div>
                <div className="absolute -bottom-7">
                  <span
                    className={`text-[10px] font-black uppercase tracking-[0.2em] whitespace-nowrap ${
                      step >= 1 ? "text-primary" : "text-gray-400"
                    }`}
                  >
                    Seats
                  </span>
                </div>
              </div>

              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 border-2 z-10 ${
                    step === 2
                      ? "bg-primary border-primary text-white shadow-lg"
                      : "bg-white border-gray-100 text-gray-400"
                  }`}
                >
                  2
                </div>
                <div className="absolute -bottom-7">
                  <span
                    className={`text-[10px] font-black uppercase tracking-[0.2em] whitespace-nowrap ${
                      step === 2 ? "text-primary" : "text-gray-400"
                    }`}
                  >
                    Details
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-6 mt-16">
        <button
          onClick={() => (step === 1 ? navigate(-1) : setStep(1))}
          className="flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-primary mb-8 transition-all group"
        >
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1" />
          {step === 1 ? "Back to Results" : "Back to Seat Map"}
        </button>

        <div className="overflow-hidden">
          {step === 1 ? (
            <div className="animate-in fade-in slide-in-from-left-8 duration-500">
              <div className="flex justify-between items-end mb-8 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <div>
                  <h1 className="text-2xl font-black text-gray-800 tracking-tight">
                    {bus.name}
                  </h1>
                  <p className="text-xs font-bold text-gray-400 uppercase mt-1 tracking-widest">
                    {bus.source} <span className="text-primary px-2">→</span>{" "}
                    {bus.destination}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
                    Starting Fare
                  </p>
                  <p className="text-3xl font-black text-secondary">
                    NT$ {bus.price}
                  </p>
                </div>
              </div>
              <SeatMap
                busId={bus.id}
                basePrice={bus.price}
                onConfirm={() => setStep(2)}
              />
            </div>
          ) : (
            <div className="animate-in fade-in slide-in-from-right-8 duration-500">
              <PassengerForm />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
