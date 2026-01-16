import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useHotel from "../hooks/useHotel";
import { useHotelStore } from "../store/useHotelStore";
import { Star } from "lucide-react";
import Button from "../components/Button";

function HotelRooms() {
  const { fetchHotelById, isLoading, error } = useHotel();
  const { hotelById } = useHotelStore();
  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;
    fetchHotelById(id);
  }, [id, fetchHotelById]);

  const hotel = id ? hotelById[id] : null;

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!hotel) return <p>Hotel not found</p>;

  return (
    <div className="min-h-screen bg-white py-28 md:py-32 px-4 md:px-16 lg:px-24 xl:px-32">
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-semibold mb-2 capitalize">
          {hotel.name}
        </h1>

        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
          <div
            className="flex items-center gap-2"
            style={{ lineHeight: "1px" }}
          >
            <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
            {`${hotel.rating} · 210 reviews`}
          </div>
          <span>•</span>
          <span>City Center</span>
          <span>•</span>
          <span className="underline cursor-pointer">View on map</span>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* LEFT: ROOMS LIST */}
        <div className="lg:col-span-2 space-y-8">
          <h2 className="text-2xl font-semibold">Available rooms</h2>

          {hotel.rooms.map((room, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row gap-6 border-b border-gray-300 pb-8"
            >
              {/* Room Image */}
              <div className="md:w-64 w-full h-48 rounded-2xl overflow-hidden bg-gray-100">
                <img
                  src={room.images?.[0] || "/room-placeholder.jpg"}
                  alt={room.name}
                  onClick={() =>
                    navigate(`/hotel/${hotel._id}/rooms/${room._id}`)
                  }
                  className="w-full h-full object-cover hover:cursor-pointer"
                />
              </div>

              {/* Room Info */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1 capitalize">
                    {room.name} room
                  </p>

                  <h3
                    onClick={() =>
                      navigate(`/hotel/${hotel._id}/rooms/${room._id}`)
                    }
                    className="text-xl font-semibold mb-2 hover:underline hover:cursor-pointer capitalize"
                  >
                    {room.name.replace("_", " ")} with {room.bedType} bed
                  </h3>

                  <div className="flex flex-wrap gap-2 text-sm text-gray-600 mb-2">
                    <span>{room.maxGuests} guests</span>
                    <span>•</span>
                    <span>{room.bedType} bed</span>
                    {room.size && (
                      <>
                        <span>•</span>
                        <span>{room.size} sq ft</span>
                      </>
                    )}
                  </div>

                  {/* Amenities */}
                  <div className="flex flex-wrap gap-2 text-sm">
                    {room.amenities.slice(0, 4).map((amenity) => (
                      <span
                        key={amenity}
                        className="border border-gray-300 px-2 py-1 rounded-md capitalize bg-slate-100 text-gray-900"
                      >
                        {amenity.replace("_", " ")}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-2">
                  <Star className="h-5 w-5 text-yellow-500 fill-yellow-500 shrink-0" />
                  <p className="text-sm text-gray-500 leading-none mt-px">
                    {room.rating ?? 4.5}
                  </p>
                </div>

                {/* Price */}
                <div className="flex justify-between items-end mt-4">
                  <p className="text-lg font-semibold">
                    ₹{room.price}
                    <span className="text-sm font-normal text-gray-500">
                      {" "}
                      / night
                    </span>
                  </p>
                  <Button />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT: BOOKING CARD */}
        <div className="hidden lg:block">
          <div className="sticky top-32 rounded-2xl border border-gray-300 shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <p className="text-xl font-semibold">
                ₹2,999
                <span className="text-sm font-normal text-gray-500">
                  {" "}
                  / night
                </span>
              </p>
              <span className="text-sm text-gray-600">⭐ 4.6</span>
            </div>

            <div className="border border-gray-300 rounded-xl overflow-hidden mb-4">
              <div className="grid grid-cols-2 text-sm">
                <div className="p-3 border-r border-gray-300">
                  <p className="text-gray-500">Check-in</p>
                  <p className="font-medium">12 Jan</p>
                </div>
                <div className="p-3">
                  <p className="text-gray-500">Check-out</p>
                  <p className="font-medium">14 Jan</p>
                </div>
              </div>
            </div>

            <button className="w-full bg-black text-white py-3 rounded-xl font-medium hover:bg-gray-900 transition">
              Reserve
            </button>

            <p className="text-center text-sm text-gray-500 mt-4">
              You won’t be charged yet
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HotelRooms;
