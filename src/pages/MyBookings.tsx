import Title from "../components/Title";
import { roomsData } from "../data/rooms";

function MyBookings() {
  return (
    <div className="py-28 md:pb-35 md:pt-32 px-4 md:px-16 lg:px-24 xl:px-32">
      <Title
        title="My Bookings"
        subTitle="Easily manage your past, current, and upcoming hotel reservations in one place. Plan your trips seamlessly with just a few clicks."
        align="left"
      />

      <div className="max-w-6xl mt-8 w-full text-gray-800">
        {/* Table Header */}
        <div
          className="hidden md:grid md:grid-cols-[3fr_2fr_1fr] w-full border-b border-gray-300 font-medium text-base py-3"
          style={{ fontFamily: "Avenir" }}
        >
          <div>Hotels</div>
          <div>Date & Timings</div>
          <div>Payment</div>
        </div>

        {/* Bookings */}
        {roomsData.map((booking) => (
          <div
            key={booking._id}
            className="grid grid-cols-1 md:grid-cols-[3fr_2fr_1fr] w-full border-b border-gray-300 py-6 gap-4"
          >
            {/* Hotel Info */}
            <div className="flex gap-4">
              <img
                src={booking.image}
                alt={booking.name}
                className="w-full md:w-44 h-28 rounded shadow object-cover"
              />
              <div className="flex flex-col justify-between">
                <div>
                  <p className="font-semibold text-lg">
                    {booking.name}
                    <span className="text-sm text-gray-500">
                      {" "}
                      ({booking.city})
                    </span>
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    {booking.roomType || "Deluxe Room"}
                  </p>
                </div>

                <button className="text-sm text-blue-600 hover:underline w-fit">
                  View details
                </button>
              </div>
            </div>

            {/* Date & Time */}
            <div className="flex flex-col justify-center text-sm">
              <p>
                <span className="font-medium">Check-in:</span> {booking.checkIn}
              </p>
              <p>
                <span className="font-medium">Check-out:</span>{" "}
                {booking.checkOut}
              </p>
              <p className="text-gray-500 mt-1">{1} night stay</p>
            </div>

            {/* Payment */}
            <div className="flex flex-col justify-center items-start md:items-end">
              <p className="font-semibold">₹ {booking.price}</p>

              <span
                className={`mt-1 text-sm px-3 py-1 rounded-full ${
                  booking.paymentStatus === "Paid"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {booking.paymentStatus || "Pending"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyBookings;
