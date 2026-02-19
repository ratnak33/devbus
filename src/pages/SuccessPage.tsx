import React, { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { CheckCircle, Ticket, ArrowRight, Download } from "lucide-react";

export default function SuccessPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const ticketRef = useRef<HTMLDivElement>(null);
  const { ticketData } = location.state || {};

  useEffect(() => {
    if (ticketData) {
      const duration = 3 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      const interval: any = setInterval(function () {
        const timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) return clearInterval(interval);
        const particleCount = 50 * (timeLeft / duration);
        confetti({
          ...defaults,
          particleCount,
          origin: { x: Math.random(), y: Math.random() - 0.2 }
        });
      }, 250);
    }
  }, [ticketData]);

  const handleDownload = async () => {
    if (!ticketRef.current) return;

    const canvas = await html2canvas(ticketRef.current, {
      scale: 2,
      backgroundColor: "#ffffff",
      useCORS: true
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 20, pdfWidth, pdfHeight);
    pdf.save(`DevBus-Ticket-${ticketData?.id}.pdf`);
  };

  if (!ticketData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <button
          onClick={() => navigate("/")}
          className="bg-primary text-white px-6 py-2 rounded-lg font-bold"
        >
          Go Home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20 pt-10 px-6">
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-10 animate-in fade-in zoom-in duration-700">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-black text-gray-800">
            Booking Successful!
          </h1>
          <p className="text-gray-500 font-medium">
            Ticket details sent to {ticketData.email}
          </p>
        </div>

        <div
          ref={ticketRef}
          className="bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-gray-100 relative animate-in slide-in-from-bottom-10 duration-700"
        >
          <div className="bg-secondary p-6 text-white flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Ticket className="w-5 h-5 text-primary" />
              <span className="font-black tracking-widest text-xs">
                DEVBUS OFFICIAL TICKET
              </span>
            </div>
            <span className="text-[10px] font-bold opacity-50 uppercase">
              PNR: {ticketData.id}
            </span>
          </div>

          <div className="p-8">
            <div className="flex justify-between items-center mb-10">
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
                  Departure
                </p>
                <p className="text-2xl font-black text-gray-800">
                  {ticketData.source}
                </p>
              </div>
              <div className="flex flex-col items-center gap-1">
                <ArrowRight className="text-primary w-5 h-5" />
                <div className="w-12 h-[2px] bg-gray-100"></div>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
                  Arrival
                </p>
                <p className="text-2xl font-black text-gray-800">
                  {ticketData.destination}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-y-8 py-8 border-y border-dashed border-gray-100">
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase mb-1">
                  Travel Date
                </p>
                <p className="font-bold text-gray-700">{ticketData.date}</p>
              </div>
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase mb-1">
                  Seat Number(s)
                </p>
                <p className="font-bold text-primary">
                  {ticketData.seats.join(", ")}
                </p>
              </div>
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase mb-1">
                  Passenger(s)
                </p>
                <p className="font-bold text-gray-700">
                  {ticketData.passengerCount} Adult(s)
                </p>
              </div>
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase mb-1">
                  Payment Status
                </p>
                <p className="text-green-600 font-black">PAID</p>
              </div>
            </div>

            <div className="mt-8 flex justify-between items-center">
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase mb-1">
                  Total Fare
                </p>
                <p className="text-3xl font-black text-secondary">
                  NT$ {ticketData.price}
                </p>
              </div>
              <div className="p-2 border-2 border-gray-100 rounded-xl">
                <div className="w-16 h-16 bg-[url('https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=DevBus-Confirmed')] bg-cover opacity-80"></div>
              </div>
            </div>
          </div>

          <div className="absolute top-[48%] -left-4 w-8 h-8 bg-gray-50 rounded-full border-r border-gray-100"></div>
          <div className="absolute top-[48%] -right-4 w-8 h-8 bg-gray-50 rounded-full border-l border-gray-100"></div>
        </div>

        <div className="mt-10 flex gap-4">
          <button
            onClick={handleDownload}
            className="flex-1 bg-white border-2 border-gray-100 text-gray-700 py-4 rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-gray-50 transition-all"
          >
            <Download className="w-5 h-5" /> DOWNLOAD PDF
          </button>
          <button
            onClick={() => navigate("/")}
            className="flex-[2] bg-primary text-white py-4 rounded-2xl font-black shadow-xl shadow-primary/20 hover:bg-primary-dark transition-all"
          >
            BOOK ANOTHER TRIP
          </button>
        </div>
      </div>
    </div>
  );
}
