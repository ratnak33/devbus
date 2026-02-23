import React, { useRef, useState } from "react";
import {
  Calendar,
  ArrowRight,
  Clock,
  MapPin,
  Download,
  Loader2,
  XCircle
} from "lucide-react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useDispatch } from "react-redux";
import { cancelBooking } from "../../store/authSlice";
import { releaseSeats } from "../../store/searchSlice";
import { type Booking } from "../../types/bus";
import CancelModal from "./CancelModal";

interface BookingItemProps {
  booking: Booking;
}

export default function BookingItem({ booking }: BookingItemProps) {
  const ticketRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  const [isDownloading, setIsDownloading] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);

  const handleDownload = async () => {
    if (!ticketRef.current) return;
    setIsDownloading(true);

    try {
      const canvas = await html2canvas(ticketRef.current, {
        scale: 2,
        backgroundColor: "#ffffff",
        useCORS: true
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 10, pdfWidth, pdfHeight);
      pdf.save(`DevBus-Ticket-${booking.id}.pdf`);
    } catch (error) {
      console.error("Error generating PDF", error);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleConfirmCancel = () => {
    dispatch(cancelBooking({ bookingId: booking.id }));
    dispatch(
      releaseSeats({
        busId: booking.busId,
        seats: booking.seats.map((seat) => `${booking.busId}-${seat}`)
      })
    );

    setShowCancelModal(false);
  };

  const isCancelled = booking.status === "Cancelled";

  return (
    <>
      {showCancelModal && (
        <CancelModal
          bookingId={booking.id}
          seats={booking.seats}
          onConfirm={handleConfirmCancel}
          onClose={() => setShowCancelModal(false)}
        />
      )}

      {/* Booking Card */}
      <div
        className={`bg-white rounded-2xl shadow-sm border transition-all group overflow-hidden relative ${
          isCancelled
            ? "border-red-100 opacity-75"
            : "border-gray-100 hover:shadow-xl"
        }`}
      >
        <div ref={ticketRef} className="bg-white">
          <div className="bg-gray-50 px-6 py-3 flex justify-between items-center border-b border-gray-100">
            <div className="flex items-center gap-3">
              <span
                className={`text-[10px] font-black px-2 py-1 rounded uppercase tracking-wider ${
                  isCancelled
                    ? "bg-red-100 text-red-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {booking.status}
              </span>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                PNR: {booking.id}
              </span>
            </div>
            <div className="flex items-center gap-1 text-xs font-bold text-gray-400">
              <Clock className="w-3 h-3" />
              <span>Recorded</span>
            </div>
          </div>

          <div className="p-6 md:p-8 flex flex-col md:flex-row justify-between md:items-center gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-4">
                <div className="text-center min-w-[80px]">
                  <p className="text-2xl font-black text-gray-800 uppercase">
                    {booking.source}
                  </p>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                    Departure
                  </p>
                </div>

                <div className="flex-1 flex flex-col items-center px-4">
                  <div className="w-full h-[2px] bg-gray-100 relative mb-1">
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-gray-300 rounded-full"></div>
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-gray-300 rounded-full"></div>
                  </div>
                  <div className="bg-gray-50 p-1 rounded-full border border-gray-100">
                    <ArrowRight className="w-3 h-3 text-gray-400" />
                  </div>
                </div>

                <div className="text-center min-w-[80px]">
                  <p className="text-2xl font-black text-gray-800 uppercase">
                    {booking.destination}
                  </p>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                    Arrival
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-6 text-sm font-medium text-gray-500">
                <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span className="font-bold text-gray-700">
                    {booking.date}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-300" />
                  <span className="text-xs font-bold uppercase tracking-wide">
                    DevBus Express
                  </span>
                </div>
              </div>
            </div>

            <div className="flex md:flex-col items-center md:items-end justify-between md:justify-center border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-8 min-w-[140px]">
              <div className="text-right">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
                  Total Paid
                </p>
                <p
                  className={`text-3xl font-black ${isCancelled ? "text-gray-400 line-through" : "text-secondary"}`}
                >
                  <span className="text-sm mr-1">NT$</span>
                  {booking.price}
                </p>
              </div>

              <div className="mt-4 text-right">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
                  Seats Booked
                </p>
                <div className="flex gap-1 justify-end flex-wrap max-w-[150px]">
                  {booking.seats.map((seat: string) => (
                    <span
                      key={seat}
                      className={`text-[10px] font-black px-2 py-1 rounded ${
                        isCancelled
                          ? "bg-gray-100 text-gray-400"
                          : "bg-primary text-white"
                      }`}
                    >
                      {seat}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50/50 p-4 border-t border-gray-100 flex justify-between items-center gap-3">
          {!isCancelled ? (
            <button
              onClick={() => setShowCancelModal(true)}
              className="flex items-center gap-2 text-sm font-black text-red-400 hover:text-red-600 transition-colors bg-white px-4 py-2 rounded-lg border border-red-100 hover:border-red-300 shadow-sm"
            >
              <XCircle className="w-4 h-4" />
              CANCEL BOOKING
            </button>
          ) : (
            <span className="text-xs font-bold text-red-400 uppercase tracking-widest">
              Booking Cancelled
            </span>
          )}

          <button
            onClick={handleDownload}
            disabled={isDownloading || isCancelled}
            className="flex items-center gap-2 text-sm font-black text-primary hover:text-primary-dark transition-colors bg-white px-4 py-2 rounded-lg border border-primary/20 shadow-sm disabled:opacity-30 disabled:cursor-not-allowed"
          >
            {isDownloading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Download className="w-4 h-4" />
            )}
            {isDownloading ? "GENERATING..." : "DOWNLOAD TICKET"}
          </button>
        </div>
      </div>
    </>
  );
}
