import { useEffect, useMemo, useState } from "react";
import { Heart, Star } from "lucide-react";
import useHotel from "../hooks/useHotel";
import { useNavigate } from "react-router-dom";
import type { Hotel } from "../schema/hotel";

type SortType = "rating" | "featured" | "name" | "";

function AllHotels() {
  const navigate = useNavigate();
  const { hotels, isLoading, fetchHotels, error } = useHotel();

  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
  const [minRating, setMinRating] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<SortType>("");

  useEffect(() => {
    fetchHotels();
  }, [fetchHotels]);

  const handleCheckbox = (
    value: string,
    setState: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setState((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  /** 🔹 FILTER + SORT LOGIC */
  const filteredHotels = useMemo(() => {
    let data: Hotel[] = [...hotels];

    // Facilities filter
    if (selectedFacilities.length > 0) {
      data = data.filter((hotel) =>
        selectedFacilities.every((f) => hotel.facilities.includes(f))
      );
    }

    // Rating filter
    if (minRating !== null) {
      data = data.filter((hotel) => hotel.rating >= minRating);
    }

    // Sorting
    if (sortBy === "rating") {
      data.sort((a, b) => b.rating - a.rating);
    }

    if (sortBy === "featured") {
      data.sort((a, b) => Number(b.isFeatured) - Number(a.isFeatured));
    }

    if (sortBy === "name") {
      data.sort((a, b) => a.name.localeCompare(b.name));
    }

    return data;
  }, [hotels, selectedFacilities, minRating, sortBy]);

  /* ---------- STATES ---------- */

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
    <div className="min-h-screen pt-28 px-4 md:px-16 lg:px-24">
      <div className="flex flex-col lg:flex-row gap-10">
        {/* LEFT – HOTEL LIST */}
        <div className="lg:w-3/4">
          <h1 className="text-4xl mb-8">All Hotels</h1>

          {filteredHotels.map((hotel) => (
            <div
              key={hotel._id}
              className="flex flex-col md:flex-row gap-6 py-10 border-b border-gray-300 last:border-0"
            >
              <img
                src={hotel.images[0]}
                alt={hotel.name}
                onClick={() => navigate(`/hotels/${hotel._id}/rooms`)}
                className="md:w-1/2 h-64 object-cover rounded-xl cursor-pointer"
              />

              <div className="md:w-1/2 space-y-2">
                <div className="flex justify-between items-center">
                  <h2
                    onClick={() => navigate(`/hotels/${hotel._id}/rooms`)}
                    className="text-2xl font-semibold cursor-pointer hover:underline capitalize"
                  >
                    {hotel.name}
                  </h2>
                  <Heart className="cursor-pointer text-gray-500" />
                </div>
                <p className="text-gray-500">
                  {hotel.city}, {hotel.country}
                </p>
                <div className="flex items-center text-sm">
                  <Star size={16} className="text-amber-400 fill-amber-400" />
                  <span className="ml-2">{hotel.rating}</span>
                </div>
                <div className="flex flex-wrap gap-2 text-xs mt-2">
                  {hotel.facilities.slice(0, 4).map((f) => (
                    <span
                      key={f}
                      className="border border-gray-300 px-2 py-1 rounded-md capitalize bg-slate-100 text-gray-900"
                    >
                      {f}
                    </span>
                  ))}
                </div>
                <span className="text-md text-gray-600 font-medium line-clamp-2">
                  {hotel.description}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT – FILTER PANEL */}
        <div className="lg:w-1/4">
          <div className="sticky top-32 border border-gray-300 rounded-xl p-6 space-y-6">
            <h2 className="text-xl font-semibold">Filter</h2>

            {/* Facilities */}
            <div>
              <p className="font-medium mb-3">Facilities</p>
              {["Wifi", "Parking", "Pool", "Gym"].map((item) => (
                <label key={item} className="flex gap-2 mb-2">
                  <input
                    type="checkbox"
                    checked={selectedFacilities.includes(item)}
                    onChange={() => handleCheckbox(item, setSelectedFacilities)}
                  />
                  {item}
                </label>
              ))}
            </div>

            {/* Rating */}
            <div>
              <p className="font-medium mb-3">Minimum Rating</p>
              {[4, 3, 2].map((rate) => (
                <label key={rate} className="flex gap-2 mb-2">
                  <input
                    type="radio"
                    name="rating"
                    checked={minRating === rate}
                    onChange={() => setMinRating(rate)}
                  />
                  {rate}+ stars
                </label>
              ))}
            </div>

            {/* Sort */}
            <div>
              <p className="font-medium mb-3">Sort By</p>
              {[
                { label: "Rating", value: "rating" },
                { label: "Featured", value: "featured" },
                { label: "Name (A–Z)", value: "name" },
              ].map((s) => (
                <label key={s.value} className="flex gap-2 mb-2">
                  <input
                    type="radio"
                    name="sort"
                    checked={sortBy === s.value}
                    onChange={() => setSortBy(s.value as SortType)}
                  />
                  {s.label}
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllHotels;
