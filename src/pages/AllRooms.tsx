import { useNavigate } from "react-router-dom";
import { hotels } from "../data/hotels";
import { Star } from "lucide-react";
import { useState } from "react";

type SortType = "low" | "high" | "popular" | "";

function AllRooms() {
  const navigate = useNavigate();

  const [selectedPrice, setSelectedPrice] = useState<string[]>([]);
  const [popularFilters, setPopularFilters] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortType>("");

  const handleCheckbox = (
    value: string,
    setState: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setState((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  return (
    <div className="pt-28 md:pt-32 px-4 md:px-16 lg:px-24 xl:px-32">
      <div className="flex flex-col lg:flex-row gap-10">
        {/* LEFT SIDE – ROOMS */}
        <div className="lg:w-3/4">
          <div className="mb-8">
            <h1 className="text-4xl md:text-[40px]">Hotels Rooms</h1>
            <p className="text-sm md:text-base text-gray-500/90 mt-2 max-w-xl">
              Take advantage of our limited-time offer and special packages.
            </p>
          </div>

          {hotels.map((room) => (
            <div
              key={room.id}
              className="flex flex-col md:flex-row gap-6 py-10 border-b border-gray-300 last:border-0"
            >
              <img
                src={room.image}
                alt={room.name}
                onClick={() => {
                  navigate(`/rooms/${room.id}`);
                  window.scrollTo(0, 0);
                }}
                className="max-h-64 md:w-1/2 rounded-xl shadow-lg object-cover cursor-pointer"
              />

              <div className="md:w-1/2 flex flex-col gap-2">
                <p className="text-gray-500">{room.location}</p>

                <p
                  onClick={() => navigate(`/rooms/${room.id}`)}
                  className="text-3xl font-medium cursor-pointer hover:underline"
                >
                  {room.name}
                </p>

                <div className="flex items-center text-sm text-gray-600">
                  <Star size={16} />
                  <span className="ml-2">4.6 (200+ reviews)</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT SIDE – FILTER BOX */}
        <div className="lg:w-1/4">
          <div className="sticky top-32 border rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-6">Filter</h2>

            {/* PRICE FILTER */}
            <div className="mb-6">
              <p className="font-medium mb-3">Price per night</p>

              {["₹0 - ₹2000", "₹2000 - ₹5000", "₹5000+"].map((price) => (
                <label key={price} className="flex items-center gap-2 mb-2">
                  <input
                    type="checkbox"
                    checked={selectedPrice.includes(price)}
                    onChange={() => handleCheckbox(price, setSelectedPrice)}
                  />
                  <span>{price}</span>
                </label>
              ))}
            </div>

            {/* POPULAR FILTERS */}
            <div className="mb-6">
              <p className="font-medium mb-3">Popular Filters</p>

              {[
                "Free Wifi",
                "Breakfast Included",
                "Swimming Pool",
                "Parking",
              ].map((item) => (
                <label key={item} className="flex items-center gap-2 mb-2">
                  <input
                    type="checkbox"
                    checked={popularFilters.includes(item)}
                    onChange={() => handleCheckbox(item, setPopularFilters)}
                  />
                  <span>{item}</span>
                </label>
              ))}
            </div>

            {/* SORT BY */}
            <div>
              <p className="font-medium mb-3">Sort By</p>

              {[
                { label: "Price: Low to High", value: "low" },
                { label: "Price: High to Low", value: "high" },
                { label: "Popularity", value: "popular" },
              ].map((item) => (
                <label
                  key={item.value}
                  className="flex items-center gap-2 mb-2"
                >
                  <input
                    type="radio"
                    name="sort"
                    value={item.value}
                    checked={sortBy === item.value}
                    onChange={(e) => setSortBy(e.target.value as SortType)}
                  />
                  <span>{item.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllRooms;
