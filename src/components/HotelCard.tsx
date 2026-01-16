import { Link } from "react-router-dom";
import type { Hotel } from "../schema/hotel";
import { MapPin, Star } from "lucide-react";

type HotelCardProps = {
  hotel: Hotel;
  index: number;
};

function HotelCard({ hotel, index }: HotelCardProps) {
  return (
    <Link
      to={`/hotels/${hotel._id}/rooms`}
      onClick={() => window.scrollTo(0, 0)}
      className="block w-full max-w-[280px] rounded-xl shadow-[0px_4px_4px_rgba(0,0,0,0.05)]"
    >
      <div className="relative">
        <img
          src={hotel.images[0] || "/placeholder.jpg"}
          alt={hotel.name}
          className="w-full max-w-[280px] rounded-xl"
        />

        {index % 2 === 0 && (
          <p className="absolute top-3 left-3 px-3 py-1 text-xs bg-white rounded-full">
            Best Seller
          </p>
        )}
      </div>

      <div className="p-4 pt-5">
        <div className="flex items-center justify-between">
          <p className="text-xl font-medium">{hotel.name}</p>
          <div className="flex items-center gap-1 text-sm">
            <Star size={16} className="text-yellow-500 fill-yellow-500" />
            {hotel.rating}
          </div>
        </div>

        <div className="flex items-center gap-1 text-sm text-gray-600">
          <MapPin size={16} />
          <span>
            {hotel.city}, {hotel.country}
          </span>
        </div>

        <div className="flex items-center justify-between mt-4">
          <p className="text-sm text-gray-600">
            {hotel.rooms.length} rooms available
          </p>

          <button
            onClick={(e) => e.preventDefault()}
            className="px-4 py-2 text-sm border rounded"
          >
            View Rooms
          </button>
        </div>
      </div>
    </Link>
  );
}

export default HotelCard;
