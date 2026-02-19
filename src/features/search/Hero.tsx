import SearchBox from "../../components/ui/SearchBox";

export default function Hero() {
  return (
    <div className="relative">
      <div className="h-[520px] relative overflow-hidden flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 hover:scale-105"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1552912112-70df5d134608?auto=format&fit=crop&q=80&w=2000')`
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/40 mix-blend-multiply" />

        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />

        <div
          className="relative z-10 max-w-7xl mx-auto px-4 text-center text-white -mt-16"
          style={{ fontFamily: "cursive" }}
        >
          <h1 className="text-5xl md:text-6xl font-black mb-6 drop-shadow-2xl tracking-tight uppercase">
            Taiwan's No. 1 <br />
            <span className="text-white/90 text-3xl md:text-4xl font-light">
              Online Bus Ticket Booking Site
            </span>
          </h1>
          <div className="flex items-center justify-center gap-4 text-lg font-medium opacity-90 drop-shadow-md">
            <span className="bg-white/20 px-3 py-1 rounded-full backdrop-blur-md">
              Safe
            </span>
            <span className="bg-white/20 px-3 py-1 rounded-full backdrop-blur-md">
              Secure
            </span>
            <span className="bg-white/20 px-3 py-1 rounded-full backdrop-blur-md">
              Reliable
            </span>
          </div>
        </div>
      </div>

      <div className="px-4 -mt-16 relative z-30">
        <SearchBox />
      </div>
    </div>
  );
}
