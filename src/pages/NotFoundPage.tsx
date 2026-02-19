import { MapPinOff, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-gray-50 px-6">
      <div className="w-32 h-32 bg-red-50 rounded-full flex items-center justify-center mb-8 animate-pulse">
        <MapPinOff className="w-16 h-16 text-primary" />
      </div>
      <h1 className="text-6xl font-black text-gray-800 tracking-tighter mb-4">
        404
      </h1>
      <h2 className="text-2xl font-bold text-gray-600 mb-2">
        Destination Not Found
      </h2>
      <p className="text-gray-400 font-medium text-center max-w-md mb-10">
        It looks like this bus route doesn't exist. Let's get you back to the
        terminal and find your way home.
      </p>

      <button
        onClick={() => navigate("/")}
        className="bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-xl font-black uppercase tracking-widest flex items-center gap-3 shadow-lg shadow-primary/20 transition-all hover:-translate-y-1"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Home
      </button>
    </div>
  );
}
