import React from "react";
import { useSelector } from "react-redux";
import { type RootState } from "../store/store";
import { Ticket, Bus } from "lucide-react";
import { useNavigate } from "react-router-dom";

import BookingItem from "../components/ui/BookingItem";

export default function MyBookingsPage() {
  const { user, bookingsByUser } = useSelector(
    (state: RootState) => state.auth
  );
  const navigate = useNavigate();

  const myBookings = user ? bookingsByUser[user.email] || [] : [];

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-20 pt-10">
      <div className="max-w-4xl mx-auto px-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-black text-gray-800 flex items-center gap-3">
              <span className="bg-primary/10 p-2 rounded-xl">
                <Ticket className="w-8 h-8 text-primary" />
              </span>
              My Bookings
            </h1>
            <p className="text-gray-400 font-bold mt-2 ml-1">
              Manage your upcoming and past journeys
            </p>
          </div>
          <button
            onClick={() => navigate("/")}
            className="hidden md:flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-primary transition-colors"
          >
            <Bus className="w-4 h-4" />
            Book New Trip
          </button>
        </div>

        {myBookings.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 text-center shadow-sm border border-gray-100 flex flex-col items-center">
            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
              <Ticket className="w-10 h-10 text-gray-300" />
            </div>
            <h3 className="text-2xl font-black text-gray-800">
              No bookings found
            </h3>
            <p className="text-gray-400 font-medium mt-2 max-w-xs mx-auto">
              You haven't booked any trips yet. Your next adventure is just a
              click away!
            </p>
            <button
              onClick={() => navigate("/")}
              className="mt-8 bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-xl font-black shadow-lg shadow-primary/20 transition-all hover:-translate-y-1"
            >
              Start Exploring
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {myBookings.map((booking) => (
              <BookingItem key={booking.id} booking={booking} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
