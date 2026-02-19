# 🚌 DevBus - Online Bus Ticket Booking Site

DevBus is a modern, responsive, and feature-rich front-end application for booking bus tickets. Built to simulate a real-world ticketing platform, it allows users to search for routes, filter results, select specific seats on an interactive seat map, and download their generated tickets as PDFs.

## ✨ Features

- **Search & Discovery:** Search for buses by source city, destination, and travel date.
- **Advanced Filtering & Sorting:** Filter buses by type (AC, Non-AC, Sleeper, Seater) and set a maximum price range. Sort results by cheapest price, highest rating, or fastest departure time.
- **Interactive Seat Selection:** A dynamic 2+1 bus layout where users can pick specific seats. Seats already booked by other users are visually locked and disabled.
- **Authentication & User States:** Simulated Login and Sign-up flow allowing users to manage their personal profiles.
- **Data Persistence:** Uses `localStorage` integrated seamlessly with Redux to persist user accounts, active bookings, and seat availability across page refreshes.
- **Multi-User Support:** Different users have isolated booking histories (User A cannot see User B's tickets), but they share the global state of occupied bus seats.
- **Ticket Generation:** Users can view their past and upcoming booking history and download high-quality PDF tickets generated directly in the browser.

## 🛠️ Tech Stack

- **Framework:** React 18 + TypeScript + Vite
- **State Management:** Redux Toolkit
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Routing:** React Router DOM
- **PDF Generation:** jsPDF + html2canvas

## 📁 Project Structure

```text
src/
├── components/
│   ├── layout/       # Header, Navigation, etc.
│   └── ui/           # Reusable components (SeatMap, BusCard, BookingItem)
├── data/             # Mock data (Bus schedules, routes)
├── features/         # Feature-specific components (Search Box, Hero section)
├── pages/            # Main route pages (Home, Booking, Login, History)
├── store/            # Redux setup (Slices, LocalStorage middleware)
├── types/            # TypeScript interfaces
└── App.tsx           # Main application routing
```
