import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type Booking } from "../types/bus";

interface UserProfile {
  name: string;
  email: string;
  password?: string;
}

interface AuthState {
  user: UserProfile | null;
  isAuthenticated: boolean;
  bookingsByUser: Record<string, Booking[]>;
  registeredUsers: UserProfile[];
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  bookingsByUser: {},
  registeredUsers: [],
  error: null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    register: (state, action: PayloadAction<UserProfile>) => {
      const userExists = state.registeredUsers.find(
        (u) => u.email === action.payload.email
      );
      if (userExists) {
        state.error = "An account with this email already exists.";
        return;
      }

      state.registeredUsers.push(action.payload);
      state.user = { name: action.payload.name, email: action.payload.email };
      state.isAuthenticated = true;
      state.error = null;

      if (!state.bookingsByUser[action.payload.email]) {
        state.bookingsByUser[action.payload.email] = [];
      }
    },

    login: (
      state,
      action: PayloadAction<{ email: string; password?: string }>
    ) => {
      const existingUser = state.registeredUsers.find(
        (u) => u.email === action.payload.email
      );

      if (!existingUser) {
        state.error = "No account found with this email. Please sign up.";
        return;
      }

      if (existingUser.password !== action.payload.password) {
        state.error = "Incorrect password. Please try again.";
        return;
      }

      state.user = { name: existingUser.name, email: existingUser.email };
      state.isAuthenticated = true;
      state.error = null;
    },

    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    },

    clearError: (state) => {
      state.error = null;
    },

    addBooking: (state, action: PayloadAction<Booking>) => {
      if (state.user) {
        const userEmail = state.user.email;
        if (!state.bookingsByUser[userEmail]) {
          state.bookingsByUser[userEmail] = [];
        }
        state.bookingsByUser[userEmail].unshift(action.payload);
      }
    },

    cancelBooking: (state, action: PayloadAction<{ bookingId: string }>) => {
      if (!state.user) return;

      const userEmail = state.user.email;
      const bookings = state.bookingsByUser[userEmail];
      if (!bookings) return;

      const booking = bookings.find((b) => b.id === action.payload.bookingId);
      if (booking && booking.status === "Confirmed") {
        booking.status = "Cancelled";
      }
    }
  }
});

export const {
  register,
  login,
  logout,
  addBooking,
  clearError,
  cancelBooking
} = authSlice.actions;
export default authSlice.reducer;
