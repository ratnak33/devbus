import React from "react";
import { BusFront, User, LogOut, Ticket } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { type RootState } from "../../store/store";
import { logout } from "../../store/authSlice";

export default function Header() {
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="bg-primary p-2.5 rounded-xl group-hover:rotate-12 transition-transform shadow-md shadow-primary/20">
              <BusFront className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-black text-gray-800 tracking-tight">
              Dev<span className="text-primary">Bus</span>
            </span>
          </Link>

          <div className="flex items-center gap-6">
            {isAuthenticated ? (
              <>
                <Link
                  to="/my-bookings"
                  className="hidden md:flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-primary transition-colors"
                >
                  <Ticket className="w-4 h-4" />
                  My Bookings
                </Link>
                <div className="flex items-center gap-4 pl-6 border-l border-gray-100">
                  <div className="text-right hidden md:block">
                    <p className="text-xs text-gray-400 font-bold uppercase">
                      Welcome
                    </p>
                    <p className="text-sm font-black text-gray-800">
                      {user?.name}
                    </p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="p-2 hover:bg-gray-100 rounded-full text-gray-400 hover:text-red-500 transition-colors"
                    title="Logout"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              </>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl border-2 border-gray-100 hover:border-primary hover:text-primary font-bold text-gray-600 transition-all"
              >
                <User className="w-4 h-4" />
                Login / Sign Up
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
