import React, { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

import Hero from "../features/search/Hero";
import BusCard from "../components/ui/BusCard";

import {
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  X,
  Filter
} from "lucide-react";

export default function HomePage() {
  const { buses } = useSelector((state: RootState) => state.search);

  const [sortBy, setSortBy] = useState<"price" | "rating" | "time">("time");
  const [filterType, setFilterType] = useState<string>("All");
  const [priceRange, setPriceRange] = useState<number>(2000);
  const [currentPage, setCurrentPage] = useState(1);
  const [showMobileFilters, setShowMobileFilters] = useState(false); // NEW STATE FOR MOBILE
  const itemsPerPage = 5;

  const processedBuses = useMemo(() => {
    let result = [...buses];

    result = result.filter((bus) => bus.price <= priceRange);

    if (filterType !== "All") {
      result = result.filter((bus) =>
        bus.type.toLowerCase().includes(filterType.toLowerCase())
      );
    }

    if (sortBy === "price") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "time") {
      result.sort((a, b) => a.departureTime.localeCompare(b.departureTime));
    }

    return result;
  }, [buses, sortBy, filterType, priceRange]);

  const totalPages = Math.ceil(processedBuses.length / itemsPerPage);
  const paginatedBuses = processedBuses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-20 font-sans">
      <Hero />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 lg:mt-12">
        <div className="flex flex-col lg:flex-row gap-8 pt-12">
          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="lg:hidden w-full bg-white border border-gray-200 text-gray-700 font-black py-4 rounded-xl flex items-center justify-center gap-2 shadow-sm active:scale-95 transition-all"
          >
            <Filter className="w-5 h-5 text-primary" />
            {showMobileFilters ? "HIDE FILTERS" : "SHOW FILTERS"}
          </button>

          <aside
            className={`
            w-full lg:w-1/4 h-fit bg-white p-6 rounded-2xl shadow-sm border border-gray-100 
            lg:sticky lg:top-24 transition-all duration-300 ease-in-out
            ${showMobileFilters ? "block" : "hidden lg:block"}
          `}
          >
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-50">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-5 h-5 text-primary" />
                <h2 className="font-black text-gray-800 uppercase tracking-wide">
                  Filters
                </h2>
              </div>
              <button
                onClick={() => {
                  setPriceRange(2000);
                  setFilterType("All");
                }}
                className="text-[10px] font-bold text-gray-400 hover:text-primary uppercase tracking-widest transition-colors"
              >
                Reset
              </button>
            </div>

            <div className="mb-8">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 block">
                Bus Type
              </label>
              <div className="space-y-3">
                {["All", "AC", "Non-AC", "Sleeper", "Seater"].map((type) => (
                  <label
                    key={type}
                    className="flex items-center gap-3 cursor-pointer group"
                  >
                    <div
                      className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
                        filterType === type
                          ? "bg-primary border-primary"
                          : "border-gray-200 group-hover:border-primary"
                      }`}
                    >
                      {filterType === type && (
                        <div className="w-2 h-2 bg-white rounded-full" />
                      )}
                    </div>
                    <input
                      type="radio"
                      name="busType"
                      checked={filterType === type}
                      onChange={() => {
                        setFilterType(type);
                        setCurrentPage(1);
                      }}
                      className="hidden"
                    />
                    <span
                      className={`text-sm font-bold transition-colors ${filterType === type ? "text-gray-800" : "text-gray-500 group-hover:text-primary"}`}
                    >
                      {type === "All" ? "All Buses" : type}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-4">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                  Max Price
                </label>
                <span className="text-sm font-black text-primary bg-primary/10 px-2 py-1 rounded-md">
                  NT$ {priceRange}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="2000"
                step="50"
                value={priceRange}
                onChange={(e) => {
                  setPriceRange(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary hover:accent-primary-dark"
              />
              <div className="flex justify-between mt-2 text-[10px] font-bold text-gray-400 uppercase">
                <span>0</span>
                <span>2000+</span>
              </div>
            </div>
          </aside>

          <section className="flex-1">
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="text-gray-500 font-bold text-sm">
                Showing{" "}
                <span className="text-black font-black">
                  {processedBuses.length}
                </span>{" "}
                Buses
              </div>

              <div className="flex items-center gap-2 bg-gray-50 p-1 rounded-xl w-full sm:w-auto overflow-x-auto">
                <button
                  onClick={() => setSortBy("price")}
                  className={`px-4 py-2 rounded-lg text-xs font-black uppercase tracking-wide transition-all whitespace-nowrap ${sortBy === "price" ? "bg-white shadow-sm text-primary" : "text-gray-400 hover:text-gray-600"}`}
                >
                  Cheapest
                </button>
                <button
                  onClick={() => setSortBy("rating")}
                  className={`px-4 py-2 rounded-lg text-xs font-black uppercase tracking-wide transition-all whitespace-nowrap ${sortBy === "rating" ? "bg-white shadow-sm text-primary" : "text-gray-400 hover:text-gray-600"}`}
                >
                  Top Rated
                </button>
                <button
                  onClick={() => setSortBy("time")}
                  className={`px-4 py-2 rounded-lg text-xs font-black uppercase tracking-wide transition-all whitespace-nowrap ${sortBy === "time" ? "bg-white shadow-sm text-primary" : "text-gray-400 hover:text-gray-600"}`}
                >
                  Fastest
                </button>
              </div>
            </div>

            <div className="space-y-4 min-h-[400px]">
              {paginatedBuses.length > 0 ? (
                paginatedBuses.map((bus) => <BusCard key={bus.id} bus={bus} />)
              ) : (
                <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl shadow-sm border border-dashed border-gray-200">
                  <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                    <X className="w-8 h-8 text-gray-300" />
                  </div>
                  <p className="text-gray-800 font-black text-lg">
                    No buses found
                  </p>
                  <p className="text-sm text-gray-400 font-medium">
                    Try adjusting your filters to see more results.
                  </p>
                  <button
                    onClick={() => {
                      setPriceRange(2000);
                      setFilterType("All");
                    }}
                    className="mt-6 text-primary font-black text-sm uppercase tracking-widest hover:underline"
                  >
                    Clear All Filters
                  </button>
                </div>
              )}
            </div>

            {processedBuses.length > itemsPerPage && (
              <div className="mt-10 flex justify-center gap-2">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => p - 1)}
                  className="p-3 bg-white border border-gray-200 rounded-xl hover:border-primary hover:text-primary disabled:opacity-50 disabled:hover:border-gray-200 disabled:hover:text-gray-400 transition-all shadow-sm"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-11 h-11 rounded-xl font-black text-sm flex items-center justify-center transition-all shadow-sm ${
                        currentPage === page
                          ? "bg-primary text-white shadow-primary/30 scale-110"
                          : "bg-white border border-gray-200 text-gray-600 hover:border-primary hover:text-primary"
                      }`}
                    >
                      {page}
                    </button>
                  )
                )}

                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => p + 1)}
                  className="p-3 bg-white border border-gray-200 rounded-xl hover:border-primary hover:text-primary disabled:opacity-50 disabled:hover:border-gray-200 disabled:hover:text-gray-400 transition-all shadow-sm"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
