import { Heart } from "lucide-react";
import useHotel from "../hooks/useHotel";
import { useEffect } from "react";

function LandingPage() {
  const { hotels, isLoading, fetchHotels, error } = useHotel();

  useEffect(() => {
    fetchHotels();
  }, [fetchHotels]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading hotels...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        {error}
      </div>
    );
  }

  if (hotels.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        No hotels found
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Hotels</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {hotels.map((hotel) => (
          <div
            key={hotel._id}
            className="rounded-lg overflow-hidden relative shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={hotel.images?.[0] || "/placeholder.png"}
              alt={hotel.name}
              className="h-56 w-full object-cover"
            />

            <div className="p-3">
              <h3 className="text-lg font-semibold">{hotel.name}</h3>

              <div className="flex gap-2 items-center text-gray-500 mt-1">
                <p className="text-sm">₹{hotel.rooms?.[0]?.price || 0}/night</p>
                <span>·</span>
                <p className="text-sm">Rating: {hotel.rating}</p>
              </div>
            </div>

            <div className="absolute top-2 flex justify-between items-center w-full px-3">
              <section className="px-3 py-1 bg-white flex justify-center items-center rounded-2xl text-sm">
                <p>Guest favorite</p>
              </section>

              <Heart className="text-gray-500 hover:text-red-500 cursor-pointer" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LandingPage;
