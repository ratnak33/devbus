import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { MapPin, Calendar, AlertCircle, X } from "lucide-react";
import { searchBuses } from "../../store/searchSlice";

export default function SearchBox() {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");

  // Custom Error State
  const [errors, setErrors] = useState({
    source: false,
    destination: false,
    date: false
  });

  const dispatch = useDispatch();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const hasErrors = {
      source: source.trim() === "",
      destination: destination.trim() === "",
      date: date === ""
    };

    setErrors(hasErrors);

    if (hasErrors.source || hasErrors.destination || hasErrors.date) {
      return;
    }

    dispatch(searchBuses({ source, destination, date }));
  };

  const handleReset = () => {
    setSource("");
    setDestination("");
    setDate("");
    setErrors({ source: false, destination: false, date: false });

    // Dispatching empty strings resets the Redux state to show ALL buses
    dispatch(searchBuses({ source: "", destination: "", date: "" }));
  };

  // --- NEW: Check if any field has text ---
  const hasInput =
    source.trim() !== "" || destination.trim() !== "" || date !== "";

  return (
    <div className="w-full max-w-5xl mx-auto transform translate-y-8 lg:translate-y-12 z-20 relative">
      <form
        onSubmit={handleSearch}
        className="bg-white rounded-lg shadow-xl flex flex-col md:flex-row overflow-hidden"
      >
        {/* Source Input */}
        <div
          className={`flex-1 relative group border-b md:border-b-0 md:border-r p-2 transition-colors ${errors.source ? "bg-red-50 border-red-200" : "border-gray-100"}`}
        >
          <div
            className={`absolute left-6 top-1/2 -translate-y-1/2 transition-colors ${errors.source ? "text-red-500" : "text-gray-400 group-focus-within:text-[#d84e55]"}`}
          >
            <MapPin className="w-5 h-5" />
          </div>
          <input
            type="text"
            placeholder={errors.source ? "Source is required" : "Source City"}
            className={`w-full h-14 pl-12 pr-4 outline-none font-bold transition-colors text-sm uppercase tracking-wide bg-transparent ${errors.source ? "text-red-700 placeholder:text-red-400" : "text-gray-700 placeholder:text-gray-400 focus:bg-gray-50"}`}
            value={source}
            onChange={(e) => {
              setSource(e.target.value);
              if (errors.source)
                setErrors((prev) => ({ ...prev, source: false }));
            }}
          />
          <label
            className={`absolute left-14 top-2 text-[8px] font-black uppercase tracking-widest pointer-events-none hidden lg:block ${errors.source ? "text-red-500" : "text-gray-400"}`}
          >
            FROM
          </label>
        </div>

        {/* Destination Input */}
        <div
          className={`flex-1 relative group border-b md:border-b-0 md:border-r p-2 transition-colors ${errors.destination ? "bg-red-50 border-red-200" : "border-gray-100"}`}
        >
          <div
            className={`absolute left-6 top-1/2 -translate-y-1/2 transition-colors ${errors.destination ? "text-red-500" : "text-gray-400 group-focus-within:text-[#d84e55]"}`}
          >
            <MapPin className="w-5 h-5" />
          </div>
          <input
            type="text"
            placeholder={
              errors.destination ? "Destination required" : "Destination"
            }
            className={`w-full h-14 pl-12 pr-4 outline-none font-bold transition-colors text-sm uppercase tracking-wide bg-transparent ${errors.destination ? "text-red-700 placeholder:text-red-400" : "text-gray-700 placeholder:text-gray-400 focus:bg-gray-50"}`}
            value={destination}
            onChange={(e) => {
              setDestination(e.target.value);
              if (errors.destination)
                setErrors((prev) => ({ ...prev, destination: false }));
            }}
          />
          <label
            className={`absolute left-14 top-2 text-[8px] font-black uppercase tracking-widest pointer-events-none hidden lg:block ${errors.destination ? "text-red-500" : "text-gray-400"}`}
          >
            TO
          </label>
        </div>

        {/* Date Input */}
        <div
          className={`w-full md:w-64 relative group p-2 border-b md:border-b-0 md:border-r transition-colors ${errors.date ? "bg-red-50 border-red-200" : "border-gray-100"}`}
        >
          <div
            className={`absolute left-6 top-1/2 -translate-y-1/2 transition-colors ${errors.date ? "text-red-500" : "text-gray-400 group-focus-within:text-[#d84e55]"}`}
          >
            <Calendar className="w-5 h-5" />
          </div>
          <input
            type="date"
            className={`w-full h-14 pl-12 pr-4 outline-none font-bold uppercase transition-colors cursor-pointer text-sm bg-transparent ${errors.date ? "text-red-700" : "text-gray-700 focus:bg-gray-50"}`}
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
              if (errors.date) setErrors((prev) => ({ ...prev, date: false }));
            }}
          />
          <label
            className={`absolute left-14 top-2 text-[8px] font-black uppercase tracking-widest pointer-events-none hidden lg:block ${errors.date ? "text-red-500" : "text-gray-400"}`}
          >
            DATE
          </label>
        </div>

        {/* Buttons Area: Reset + Search */}
        <div className="flex flex-row transition-all">
          {/* Reset Button - ONLY visible if user has typed something */}
          {hasInput && (
            <button
              type="button"
              onClick={handleReset}
              title="Clear Search"
              className="bg-gray-50 hover:bg-gray-200 text-gray-400 hover:text-gray-700 w-16 h-auto py-4 md:py-0 flex items-center justify-center transition-colors border-r border-gray-100 animate-in fade-in zoom-in duration-200"
            >
              <X className="w-5 h-5" />
            </button>
          )}

          {/* Search Button */}
          <button
            type="submit"
            className="bg-[#d84e55] hover:bg-[#c03940] text-white flex-1 md:w-40 py-4 md:py-0 font-black text-sm uppercase tracking-widest flex items-center justify-center transition-all"
          >
            SEARCH
          </button>
        </div>
      </form>

      {/* Global Error Banner */}
      {(errors.source || errors.destination || errors.date) && (
        <div className="absolute -bottom-10 left-0 right-0 flex justify-center animate-in fade-in slide-in-from-top-2">
          <div className="bg-red-100 text-red-600 text-xs font-bold px-4 py-2 rounded-full flex items-center gap-2 shadow-sm border border-red-200">
            <AlertCircle className="w-4 h-4" />
            Please fill in all highlighted fields to find your bus.
          </div>
        </div>
      )}
    </div>
  );
}
