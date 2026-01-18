import { Calendar, Search, MapPinHouse } from "lucide-react";
import { hotels } from "../data/hotels";
import useSearchDestinationStore from "../store/useSearchDestionationStore";
import { useNavigate } from "react-router-dom";

function Hero() {
  const {
    destination,
    checkInDate,
    checkOutDate,
    guests,
    setDestination,
    setCheckInDate,
    setCheckOutDate,
    setGuests,
  } = useSearchDestinationStore();

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const params = new URLSearchParams({
      destination,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      guests: String(guests),
    });

    navigate(`/search?${params}`);
  };

  return (
    <div
      className="relative flex flex-col items-start justify-center px-6 lg:px-24 xl:px-32 text-white min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1445019980597-93fa8acb246c?q=80&w=1474&auto=format&fit=crop')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 max-w-xl mb-6">
        <div className="bg-[#4780ae] opacity-70 w-fit px-3 py-1 rounded-2xl mb-4">
          <p className="font-medium">The Ultimate Hotel Experience</p>
        </div>

        <h3 className="text-4xl md:text-5xl font-bold mb-4">
          Discover Something Amazing
        </h3>
        <p className="text-lg text-white/90 mb-6">
          High-quality products curated just for you.
        </p>
      </div>

      {/* Search Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white text-gray-500 rounded-lg px-6 py-4 z-10 flex flex-col md:flex-row gap-4 max-md:mx-auto"
      >
        {/* Destination */}
        <div>
          <div className="flex items-center gap-2">
            <MapPinHouse className="w-4 h-4 text-gray-800" />
            <label>Destination</label>
          </div>
          <input
            list="destinations"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            type="text"
            className="rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none"
            placeholder="Type here"
            required
          />
          <datalist id="destinations">
            {hotels.map((hotel, index) => (
              <option value={hotel.location} key={index} />
            ))}
          </datalist>
        </div>

        {/* Check-in */}
        <div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-800" />
            <label>Check in</label>
          </div>
          <input
            type="date"
            value={checkInDate}
            onChange={(e) => setCheckInDate(e.target.value)}
            className="rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none"
          />
        </div>

        {/* Check-out */}
        <div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-800" />
            <label>Check out</label>
          </div>
          <input
            type="date"
            value={checkOutDate}
            onChange={(e) => setCheckOutDate(e.target.value)}
            className="rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none"
          />
        </div>

        {/* Guests */}
        <div className="flex md:flex-col gap-1">
          <label>Guests</label>
          <input
            min={1}
            max={4}
            type="number"
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            className="rounded border border-gray-200 px-3 py-1.5 text-sm outline-none max-w-20"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="flex items-center justify-center gap-1 rounded-md bg-black py-3 px-4 text-white my-auto max-md:w-full"
        >
          <Search className="w-4 h-4" />
          <span>Search</span>
        </button>
      </form>
    </div>
  );
}

export default Hero;
