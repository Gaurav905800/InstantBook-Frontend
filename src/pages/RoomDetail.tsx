import { useParams } from "react-router-dom";
import { useHotelStore } from "../store/useHotelStore";
import { useEffect, useState } from "react";
import StarRating from "../components/StarRating";
import {
  MapPin,
  Wifi,
  Tv,
  Coffee,
  Wind,
  Bath,
  Wine,
  DoorOpen,
  Check,
} from "lucide-react";
import { commanFeatures } from "../data/commanFeatures";

function RoomDetail() {
  const { hotelId, roomId } = useParams<{
    hotelId: string;
    roomId: string;
  }>();

  const [mainImage, setMainImage] = useState<string | null>(null);
  useEffect(() => {
    console.log(hotelId, roomId);
  });

  const hotel = useHotelStore((state) => state.hotelById[hotelId!]);

  const room = hotel?.rooms.find((r) => r._id === roomId);

  if (!hotel || !room) {
    return <div>Room not found</div>;
  }

  const amenityIcons: Record<string, React.ReactNode> = {
    wifi: <Wifi className="w-6 h-6" />,
    tv: <Tv className="w-5 h-5" />,
    balcony: <DoorOpen className="w-5 h-5" />,
    minibar: <Wine className="w-5 h-5" />,
    bathtub: <Bath className="w-5 h-5" />,
    air_conditioner: <Wind className="w-5 h-5" />,
    coffee_maker: <Coffee className="w-5 h-5" />,
  };

  // Get icon for amenity name
  const getAmenityIcon = (amenity: string) => {
    const lowerAmenity = amenity.toLowerCase();
    for (const [key, icon] of Object.entries(amenityIcons)) {
      if (lowerAmenity.includes(key)) {
        return icon;
      }
    }
    return <Check className="w-5 h-5" />;
  };

  return (
    <div className="py-28 md:py-35 px-4 md:px-16 lg-px-24 xl-px-32">
      <div
        className="flex flex-col md:flex-row items-start md:items-center gap-2"
        style={{ fontFamily: "Arial Rounded MT Bold" }}
      >
        <h1 className="text-3xl md:text-4xl capitalize font-semibold">
          {room.name.replace("_", " ")} Room{" "}
          <span className="text-sm">({`${room.bedType} Bed`})</span>
        </h1>
        <p className="text-xs font-inter py-1.5 px-3 text-white bg-orange-500 rounded-full">
          20% OFF
        </p>
      </div>

      <div className="flex items-center gap-1 mt-2">
        <StarRating rating={room.rating ?? 4.5} />
      </div>

      <div
        className="flex items-center gap-1 text-gray-500 mt-2"
        style={{ fontFamily: "Arial Rounded MT Bold", fontWeight: "normal" }}
      >
        <MapPin />
        <span>{`${hotel?.address}, ${hotel?.city}, ${hotel.country}`} </span>
      </div>

      <div className="flex flex-col lg:flex-row mt-6 gap-6">
        <div className="lg:w-1/2 w-full">
          <img
            src={mainImage || room.images[0]}
            alt="Room Image"
            className="w-full rounded-xl shadow-lg object-cover"
          />
        </div>

        <div className="grid grid-cols-2 gap-4 lg:w-1/2 w-full">
          {room.images.length > 1 &&
            room.images.map((img, idx) => (
              <img
                onClick={() => setMainImage(img)}
                src={img}
                alt="Room images"
                key={idx}
                className={`w-full rounded-xl shadow-md object-cover cursor-pointer ${
                  mainImage === img && "outline-3 outline-orange-500"
                }`}
              />
            ))}
        </div>
      </div>
      <div className="flex flex-col md:flex-row md:justify-between mt-10">
        <div className="flex flex-col">
          <h1
            className="text-2xl md:text-3xl font-semibold mb-4"
            style={{
              fontFamily: "Arial Rounded MT Bold",
              fontWeight: "normal",
            }}
          >
            Experience Luxury like never before
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {room.amenities.map((amenity, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <div className="text-black">{getAmenityIcon(amenity)}</div>
                <span className="font-medium capitalize">
                  {amenity.replace(/_/g, " ")}
                </span>
              </div>
            ))}
          </div>
        </div>
        <p className="text-2xl font-medium">₹{room.price} /night</p>
      </div>
      {/* CheckIn checkOut form */}
      <form className="flex flex-col md:flex-row items-start md:items-center justify-between bg-white shadow-md p-6 rounded-xl mx-auto mt-16 max-w-6xl">
        <div className="flex flex-col flex-wrap md:flex-row items-start md:items-center gap-4 md:gap-10 text-gray-500">
          <div className="flex flex-col">
            <label htmlFor="checkInDate" className="font-medium">
              Check-In
            </label>
            <input
              type="date"
              id="CheckInDate"
              placeholder="Check-In"
              className="w-full rounded border border-gray-300 px-3 py-2 mt-1.5 focus:outline-none focus:border-black"
              required
            />
          </div>
          <div className="w-px h-15 bg-gray-300/70 max-md:hidden"></div>
          <div className="flex flex-col">
            <label htmlFor="checkOutDate" className="font-medium">
              Check-Out
            </label>
            <input
              type="date"
              id="CheckOutDate"
              placeholder="Check-Out"
              className="w-full rounded border border-gray-300 px-3 py-2 mt-1.5 focus:outline-none focus:border-black"
              required
            />
          </div>
          <div className="w-px h-15 bg-gray-300/70 max-md:hidden"></div>
          <div className="flex flex-col">
            <label htmlFor="checkOutDate" className="font-medium">
              Guest
            </label>
            <input
              type="number"
              id="Guest"
              placeholder="0"
              className="max-w-20 rounded border border-gray-300 px-3 py-2 mt-1.5 focus:outline-none focus:border-black"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="bg-black hover:scale-105 hover:bg-gray-900 transition-all text-white rounded-md max-md:w-full max-md:mt-6 md:px-25 py-3 md:py-4 text-base cursor-pointer "
          style={{
            fontFamily: "Arial Rounded MT Bold",
          }}
        >
          Check Availability
        </button>
      </form>

      <div className="mt-25 space-y-4">
        {commanFeatures.map((feature, index) => (
          <div
            key={index}
            className="flex flex-start gap-2"
            style={{
              fontFamily: "Avenir Book",
            }}
          >
            <feature.icon className=" size-7 text-white fill-gray-800" />
            <div>
              <p className="text-base">{feature.feature} </p>
              <p className="text-gray-500">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="max-w-3xl border-y border-gray-300 my-15 py-10 text-gray-500">
        <p style={{ fontFamily: "Avenir" }}>
          Guests can enjoy a comfortable and thoughtfully designed stay that
          prioritizes convenience, cleanliness, and peace of mind. The space is
          well-maintained, equipped with essential amenities, and designed to
          make both short and long stays relaxing. From smooth check-in to a
          quiet, welcoming environment, every detail is curated to enhance the
          guest experience. The location offers easy access to nearby
          attractions, dining options, and transportation, making it ideal for
          both leisure and business travelers. Whether visiting for a quick
          getaway or an extended stay, guests can expect reliability, comfort,
          and a consistently high standard of service throughout their visit.{" "}
        </p>
      </div>

      <div className="flex flex-col items-start gap-4">
        <div>{/* <img src={} alt="" /> */}</div>
      </div>
    </div>
  );
}

export default RoomDetail;
