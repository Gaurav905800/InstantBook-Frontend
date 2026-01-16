import { Calendar, Search, MapPinHouse } from "lucide-react";
import { hotels } from "../data/hotels";

function Hero() {
  return (
    <div
      className="relative flex flex-col items-start justify-center px-6 lg:px-24 xl:px-32 text-white min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1445019980597-93fa8acb246c?q=80&w=1474&auto=format&fit=crop')`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 max-w-xl mb-6">
        <div
          className="bg-[#4780ae] opacity-70 w-fit px-3 py-1 text-center rounded-2xl mb-4
        "
        >
          <p className="font-medium">The Ultimate Hotel Experience</p>
        </div>

        <h3 className="text-4xl md:text-5xl font-bold mb-4">
          Discover Something Amazing
        </h3>
        <p className="text-lg text-white/90 mb-6">
          High-quality products curated just for you.
        </p>
      </div>

      <form className="bg-white text-gray-500 rounded-lg px-6 py-4 z-10  flex flex-col md:flex-row max-md:items-start gap-4 max-md:mx-auto">
        <div>
          <div className="flex items-center gap-2">
            <MapPinHouse className="w-4 h-4 text-gray-800" />
            <label htmlFor="destinationInput">Destination</label>
          </div>
          <input
            list="destinations"
            id="destinationInput"
            type="text"
            className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none"
            placeholder="Type here"
            required
          />
          <datalist id="destinations">
            {hotels.map((hotel, index) => (
              <option value={hotel.location} key={index} />
            ))}
          </datalist>
        </div>

        <div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-800" />
            <label htmlFor="checkIn">Check in</label>
          </div>
          <input
            id="checkIn"
            type="date"
            className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none"
          />
        </div>

        <div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-800" />
            <label htmlFor="checkOut">Check out</label>
          </div>
          <input
            id="checkOut"
            type="date"
            className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none"
          />
        </div>

        <div className="flex md:flex-col max-md:gap-2 max-md:items-center">
          <label htmlFor="guests">Guests</label>
          <input
            min={1}
            max={4}
            id="guests"
            type="number"
            className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none  max-w-16"
            placeholder="0"
          />
        </div>

        <button className="flex items-center justify-center gap-1 rounded-md bg-black py-3 px-4 text-white my-auto cursor-pointer max-md:w-full max-md:py-1">
          <Search className="w-4 h-4 text-white" />
          <span>Search</span>
        </button>
      </form>
    </div>
  );
}

export default Hero;
