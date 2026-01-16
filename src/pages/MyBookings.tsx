import Title from "../components/Title";

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
      </div>
    </div>
  );
}

export default MyBookings;
