export interface Bus {
  id: string;
  name: string;
  source: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  price: number;
  type: string;
  seatsAvailable: number;
  rating: number;
  duration: string;
  bookedSeats: string[];
}

export interface Booking {
  id: string;
  source: string;
  destination: string;
  date: string;
  price: number;
  seats: string[];
  status: "Confirmed" | "Cancelled";
}

export interface SearchState {
  source: string;
  destination: string;
  date: string;
  buses: Bus[];
  loading: boolean;
  error: string | null;
}
