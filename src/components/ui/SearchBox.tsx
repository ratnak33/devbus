import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { type RootState } from "../../store/store";
import { MapPin, Calendar, AlertCircle, X } from "lucide-react";
import { searchBuses } from "../../store/searchSlice";

const TAIWAN_CITIES = [
  "Taipei",
  "Kaohsiung",
  "Taichung",
  "Tainan",
  "Yilan",
  "Hualien",
  "Taitung",
  "Keelung",
  "Taoyuan",
  "Hsinchu"
];

export default function SearchBox() {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");

  const [showSourceDropdown, setShowSourceDropdown] = useState(false);
  const [showDestDropdown, setShowDestDropdown] = useState(false);

  const [activeSourceIndex, setActiveSourceIndex] = useState(-1);
  const [activeDestIndex, setActiveDestIndex] = useState(-1);

  const [errors, setErrors] = useState({
    source: false,
    destination: false,
    date: false
  });

  const dispatch = useDispatch();
  const savedSearch = useSelector((state: RootState) => state.search);

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    if (savedSearch?.source) setSource(savedSearch.source);
    if (savedSearch?.destination) setDestination(savedSearch.destination);
    if (savedSearch?.date) setDate(savedSearch.date);
  }, [savedSearch?.source, savedSearch?.destination, savedSearch?.date]);

  const filteredSources =
    source.trim() === ""
      ? []
      : TAIWAN_CITIES.filter((city) =>
          city.toLowerCase().includes(source.toLowerCase())
        );

  const filteredDestinations =
    destination.trim() === ""
      ? []
      : TAIWAN_CITIES.filter((city) =>
          city.toLowerCase().includes(destination.toLowerCase())
        );

  const handleSourceKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSourceDropdown || filteredSources.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveSourceIndex((prev) =>
        prev < filteredSources.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveSourceIndex((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === "Enter" && activeSourceIndex >= 0) {
      e.preventDefault();
      setSource(filteredSources[activeSourceIndex]);
      setShowSourceDropdown(false);
      setActiveSourceIndex(-1);
    } else if (e.key === "Escape") {
      setShowSourceDropdown(false);
      setActiveSourceIndex(-1);
    }
  };

  const handleDestKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showDestDropdown || filteredDestinations.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveDestIndex((prev) =>
        prev < filteredDestinations.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveDestIndex((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === "Enter" && activeDestIndex >= 0) {
      e.preventDefault();
      setDestination(filteredDestinations[activeDestIndex]);
      setShowDestDropdown(false);
      setActiveDestIndex(-1);
    } else if (e.key === "Escape") {
      setShowDestDropdown(false);
      setActiveDestIndex(-1);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const hasErrors = {
      source: source.trim() === "",
      destination: destination.trim() === "",
      date: date === "" || date < today
    };

    setErrors(hasErrors);

    if (hasErrors.source || hasErrors.destination || hasErrors.date) return;

    dispatch(searchBuses({ source, destination, date }));
    setShowSourceDropdown(false);
    setShowDestDropdown(false);
  };

  const handleReset = () => {
    setSource("");
    setDestination("");
    setDate("");
    setErrors({ source: false, destination: false, date: false });
    dispatch(searchBuses({ source: "", destination: "", date: "" }));
  };

  const hasInput =
    source.trim() !== "" || destination.trim() !== "" || date !== "";

  return (
    <div className="w-full max-w-5xl mx-auto transform translate-y-8 lg:translate-y-12 z-20 relative">
      <form
        onSubmit={handleSearch}
        noValidate
        className="bg-white rounded-lg shadow-xl flex flex-col md:flex-row overflow-visible"
      >
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
            className={`w-full h-14 pl-12 pr-4 outline-none font-bold transition-colors text-sm uppercase tracking-wide bg-transparent ${errors.source ? "text-red-700 placeholder:text-red-400" : "text-gray-700 placeholder:text-gray-400"}`}
            value={source}
            onChange={(e) => {
              setSource(e.target.value);
              setShowSourceDropdown(true);
              setActiveSourceIndex(-1);
              if (errors.source)
                setErrors((prev) => ({ ...prev, source: false }));
            }}
            onFocus={() => setShowSourceDropdown(true)}
            onBlur={() => {
              setShowSourceDropdown(false);
              setActiveSourceIndex(-1);
            }}
            onKeyDown={handleSourceKeyDown}
          />
          <label
            className={`absolute left-14 top-2 text-[8px] font-black uppercase tracking-widest pointer-events-none hidden lg:block ${errors.source ? "text-red-500" : "text-gray-400"}`}
          >
            FROM
          </label>

          {showSourceDropdown && filteredSources.length > 0 && (
            <ul className="absolute top-full left-0 w-full bg-white shadow-2xl rounded-b-lg border border-gray-100 mt-1 z-50 max-h-48 overflow-y-auto">
              {filteredSources.map((city, index) => (
                <li
                  key={city}
                  onMouseDown={() => {
                    setSource(city);
                    setShowSourceDropdown(false);
                    setActiveSourceIndex(-1);
                  }}
                  onMouseEnter={() => setActiveSourceIndex(index)}
                  className={`px-6 py-3 cursor-pointer font-bold text-sm uppercase tracking-wide transition-colors ${
                    index === activeSourceIndex
                      ? "bg-red-50 text-[#d84e55]"
                      : "text-gray-700 hover:bg-red-50 hover:text-[#d84e55]"
                  }`}
                >
                  {city}
                </li>
              ))}
            </ul>
          )}
        </div>

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
            className={`w-full h-14 pl-12 pr-4 outline-none font-bold transition-colors text-sm uppercase tracking-wide bg-transparent ${errors.destination ? "text-red-700 placeholder:text-red-400" : "text-gray-700 placeholder:text-gray-400"}`}
            value={destination}
            onChange={(e) => {
              setDestination(e.target.value);
              setShowDestDropdown(true);
              setActiveDestIndex(-1);
              if (errors.destination)
                setErrors((prev) => ({ ...prev, destination: false }));
            }}
            onFocus={() => setShowDestDropdown(true)}
            onBlur={() => {
              setShowDestDropdown(false);
              setActiveDestIndex(-1);
            }}
            onKeyDown={handleDestKeyDown}
          />
          <label
            className={`absolute left-14 top-2 text-[8px] font-black uppercase tracking-widest pointer-events-none hidden lg:block ${errors.destination ? "text-red-500" : "text-gray-400"}`}
          >
            TO
          </label>

          {showDestDropdown && filteredDestinations.length > 0 && (
            <ul className="absolute top-full left-0 w-full bg-white shadow-2xl rounded-b-lg border border-gray-100 mt-1 z-50 max-h-48 overflow-y-auto">
              {filteredDestinations.map((city, index) => (
                <li
                  key={city}
                  onMouseDown={() => {
                    setDestination(city);
                    setShowDestDropdown(false);
                    setActiveDestIndex(-1);
                  }}
                  onMouseEnter={() => setActiveDestIndex(index)}
                  className={`px-6 py-3 cursor-pointer font-bold text-sm uppercase tracking-wide transition-colors ${
                    index === activeDestIndex
                      ? "bg-red-50 text-[#d84e55]"
                      : "text-gray-700 hover:bg-red-50 hover:text-[#d84e55]"
                  }`}
                >
                  {city}
                </li>
              ))}
            </ul>
          )}
        </div>

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
            min={today}
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

        <div className="flex flex-row transition-all">
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

          <button
            type="submit"
            className="bg-[#d84e55] hover:bg-[#c03940] text-white flex-1 md:w-40 py-4 md:py-0 font-black text-sm uppercase tracking-widest flex items-center justify-center transition-all"
          >
            SEARCH
          </button>
        </div>
      </form>

      {(errors.source || errors.destination || errors.date) && (
        <div className="absolute -bottom-10 left-0 right-0 flex justify-center animate-in fade-in slide-in-from-top-2 z-50">
          <div className="bg-red-100 text-red-600 text-xs font-bold px-4 py-2 rounded-full flex items-center gap-2 shadow-sm border border-red-200">
            <AlertCircle className="w-4 h-4" />
            {date !== "" && date < today
              ? source.trim() === "" || destination.trim() === ""
                ? "Please fill in all required fields and select a valid future date."
                : "Please select a valid future date."
              : "Please fill in all required fields to find your bus."}
          </div>
        </div>
      )}
    </div>
  );
}
