import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type Bus } from "../types/bus";
import { MOCK_BUSES } from "../data/buses";

interface SearchState {
  source: string;
  destination: string;
  date: string;
  buses: Bus[];
  allBuses: Bus[];
}

const initialState: SearchState = {
  source: "",
  destination: "",
  date: "",
  buses: MOCK_BUSES,
  allBuses: MOCK_BUSES
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    searchBuses: (
      state,
      action: PayloadAction<{
        source: string;
        destination: string;
        date: string;
      }>
    ) => {
      const { source, destination, date } = action.payload;

      state.source = source;
      state.destination = destination;
      state.date = date;

      if (!source && !destination) {
        state.buses = state.allBuses;
        return;
      }

      // Filter ONLY by source and destination to simulate the search
      state.buses = state.allBuses.filter((bus) => {
        const matchSource = bus.source.toLowerCase() === source.toLowerCase();
        const matchDestination =
          bus.destination.toLowerCase() === destination.toLowerCase();

        return matchSource && matchDestination;
      });
    },
    confirmBooking: (
      state,
      action: PayloadAction<{ busId: string; seats: string[] }>
    ) => {
      const bus = state.buses.find((b) => b.id === action.payload.busId);
      if (bus) {
        // 1. Reduce the count
        bus.seatsAvailable -= action.payload.seats.length;

        // 2. Add the specific seats to the booked array permanently
        if (!bus.bookedSeats) bus.bookedSeats = [];
        bus.bookedSeats.push(...action.payload.seats);
      }
    }
  }
});

export const { searchBuses, confirmBooking } = searchSlice.actions;
export default searchSlice.reducer;
