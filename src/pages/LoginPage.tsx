import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { login, register, clearError } from "../store/authSlice";
import { type RootState } from "../store/store";
import {
  BusFront,
  ArrowRight,
  UserPlus,
  LogIn,
  AlertCircle
} from "lucide-react";

export default function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { isAuthenticated, error } = useSelector(
    (state: RootState) => state.auth
  );
  const from = location.state?.from?.pathname || "/";

  // Clear errors when toggling between login and signup
  useEffect(() => {
    dispatch(clearError());
  }, [isSignUp, dispatch]);

  // Navigate away if successfully authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSignUp) {
      dispatch(register({ name, email, password }));
    } else {
      dispatch(login({ email, password }));
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-4 pt-10 pb-20">
      <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl w-full max-w-md border border-gray-100">
        <div className="text-center mb-8">
          <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <BusFront className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-2xl font-black text-gray-800">
            {isSignUp ? "Create an Account" : "Welcome Back"}
          </h1>
          <p className="text-gray-400 font-medium mt-1">
            {isSignUp
              ? "Join DevBus to start booking"
              : "Sign in to manage your bookings"}
          </p>
        </div>

        {/* Toggle Buttons */}
        <div className="flex bg-gray-50 p-1 rounded-xl mb-6">
          <button
            type="button"
            onClick={() => setIsSignUp(false)}
            className={`flex-1 py-2 rounded-lg text-sm font-black flex items-center justify-center gap-2 transition-all ${!isSignUp ? "bg-white text-primary shadow-sm" : "text-gray-400 hover:text-gray-600"}`}
          >
            <LogIn className="w-4 h-4" /> LOGIN
          </button>
          <button
            type="button"
            onClick={() => setIsSignUp(true)}
            className={`flex-1 py-2 rounded-lg text-sm font-black flex items-center justify-center gap-2 transition-all ${isSignUp ? "bg-white text-primary shadow-sm" : "text-gray-400 hover:text-gray-600"}`}
          >
            <UserPlus className="w-4 h-4" /> SIGN UP
          </button>
        </div>

        {/* Display Redux Errors */}
        {error && (
          <div className="mb-6 bg-red-50 text-red-600 p-3 rounded-lg text-sm font-bold flex items-center gap-2 border border-red-100 animate-in fade-in slide-in-from-top-2">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {isSignUp && (
            <div className="animate-in fade-in slide-in-from-top-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 font-bold text-gray-700 focus:outline-none focus:border-primary focus:bg-white transition-all"
                placeholder="John Doe"
                required={isSignUp}
              />
            </div>
          )}

          <div>
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 font-bold text-gray-700 focus:outline-none focus:border-primary focus:bg-white transition-all"
              placeholder="traveler@devbus.com"
              required
            />
          </div>

          <div>
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 font-bold text-gray-700 focus:outline-none focus:border-primary focus:bg-white transition-all"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary hover:bg-primary-dark text-white font-black py-4 rounded-xl shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2 group mt-8"
          >
            {isSignUp ? "CREATE ACCOUNT" : "SECURE SIGN IN"}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>
      </div>
    </div>
  );
}
