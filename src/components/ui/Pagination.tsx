import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange
}: PaginationProps) {
  return (
    <div className="mt-10 flex justify-center gap-2">
      {/* Previous Button */}
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="p-3 bg-white border border-gray-200 rounded-xl hover:border-primary hover:text-primary disabled:opacity-50 disabled:hover:border-gray-200 disabled:hover:text-gray-400 transition-all shadow-sm"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* Page Number Buttons */}
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`w-11 h-11 rounded-xl font-black text-sm flex items-center justify-center transition-all shadow-sm ${
            currentPage === page
              ? "bg-primary text-white shadow-primary/30 scale-110"
              : "bg-white border border-gray-200 text-gray-600 hover:border-primary hover:text-primary"
          }`}
        >
          {page}
        </button>
      ))}

      {/* Next Button */}
      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="p-3 bg-white border border-gray-200 rounded-xl hover:border-primary hover:text-primary disabled:opacity-50 disabled:hover:border-gray-200 disabled:hover:text-gray-400 transition-all shadow-sm"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}
