import { useNavigate } from "react-router-dom";
import HotelCard from "./HotelCard";
import Title from "./Title";
import useHotel from "../hooks/useHotel";
import { useEffect } from "react";

function FeaturedDestination() {
  const navigate = useNavigate();
  const { hotels, isLoading, fetchHotels, error } = useHotel();

  useEffect(() => {
    fetchHotels();
  }, [fetchHotels]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        Loading hotels...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[50vh] text-red-500">
        {error}
      </div>
    );
  }

  if (hotels.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        No hotels found
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center px-6 md:px-16 lg:px-24 bg-slate-50 py-20">
      <Title
        title="Featured Destination"
        subTitle="Experience thoughtfully designed stays that blend comfort, modern elegance, and personalized hospitality."
      />

      <div className="flex flex-wrap items-center justify-center gap-6 mt-20">
        {hotels.map((hotel, index) => (
          <HotelCard key={hotel._id} hotel={hotel} index={index} />
        ))}
      </div>

      <button
        onClick={() => {
          navigate("/hotels");
          window.scrollTo(0, 0);
        }}
        className="my-16 px-4 py-2 text-sm font-medium border border-gray-300 rounded bg-white hover:bg-gray-50 transition-all cursor-pointer"
      >
        View All Destinations
      </button>
    </div>
  );
}

export default FeaturedDestination;
