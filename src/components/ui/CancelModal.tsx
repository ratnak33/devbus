import React, { useEffect } from "react";
import { AlertTriangle } from "lucide-react";

interface CancelModalProps {
  bookingId: string;
  seats: string[];
  onConfirm: () => void;
  onClose: () => void;
}

export default function CancelModal({
  bookingId,
  seats,
  onConfirm,
  onClose
}: CancelModalProps) {
  // Lock background scroll when modal is open,
  // restore it when modal is closed/unmounted
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-3xl shadow-2xl p-8 max-w-sm w-full animate-in zoom-in-95 duration-200">
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4">
            <AlertTriangle className="w-8 h-8 text-red-500" />
          </div>

          <h3 className="text-xl font-black text-gray-800 mb-2">
            Cancel Booking?
          </h3>
          <p className="text-sm text-gray-500 font-medium mb-2">
            PNR: <span className="font-black text-gray-700">{bookingId}</span>
          </p>
          <p className="text-sm text-gray-400 mb-6">
            Your seats{" "}
            <span className="font-black text-gray-600">{seats.join(", ")}</span>{" "}
            will be released and made available for other passengers. This
            action cannot be undone.
          </p>

          <div className="flex gap-3 w-full">
            <button
              onClick={onClose}
              className="flex-1 py-3 rounded-xl border-2 border-gray-200 font-black text-gray-500 hover:border-gray-300 hover:bg-gray-50 transition-all"
            >
              Keep It
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white font-black transition-all shadow-lg shadow-red-200 active:scale-95"
            >
              Yes, Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
