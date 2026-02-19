import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface BookingState {
  selectedSeats: string[];
  totalPrice: number;
}

const initialState: BookingState = {
  selectedSeats: [],
  totalPrice: 0
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    toggleSeat: (
      state,
      action: PayloadAction<{ seatId: string; price: number }>
    ) => {
      const { seatId, price } = action.payload;
      if (state.selectedSeats.includes(seatId)) {
        // Remove seat
        state.selectedSeats = state.selectedSeats.filter((id) => id !== seatId);
        state.totalPrice -= price;
      } else {
        // Add seat (Limit to 6 seats usually)
        if (state.selectedSeats.length < 6) {
          state.selectedSeats.push(seatId);
          state.totalPrice += price;
        }
      }
    },
    resetBooking: (state) => {
      state.selectedSeats = [];
      state.totalPrice = 0;
    }
  }
});

export const { toggleSeat, resetBooking } = bookingSlice.actions;
export default bookingSlice.reducer;
