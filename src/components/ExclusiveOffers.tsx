import { ArrowRight } from "lucide-react";
import Title from "./Title";
import { exclusiveOffers } from "../data/exclusiveOffers";

function ExclusiveOffers() {
  return (
    <div className="flex flex-col items-center px-6 md:px-16 lg:px-24 xl:px-32 pt-20 pb-30">
      <div className="flex flex-col md:flex-row items-center justify-between w-full">
        <Title
          title="Exclusive Offers"
          subTitle="Take advantage of our limited-time offer and special packages to enhance your stay and create unforgettable memories. "
          align="left"
        />

        <button className="group flex items-center gap-2 font-medium cursor-pointer max-md:mt-12">
          View All Offers
          <ArrowRight className="group-hover:translate-x-1 transition-all" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
        {exclusiveOffers.map((item) => (
          <div
            key={item._id}
            className="group relative flex flex-col items-start justify-between
                 gap-4 pt-12 md:pt-16 pb-6 px-4
                 min-h-70
                 rounded-xl text-white
                 bg-no-repeat bg-cover bg-center"
            style={{ backgroundImage: `url(${item.image})` }}
          >
            {/* Offer Badge */}
            <p className="absolute z-10 top-4 left-4 px-3 py-1 text-xs bg-white text-gray-800 font-medium rounded-full">
              {item.offerPercent}% OFF
            </p>

            <div className="absolute inset-0 bg-black/40 rounded-xl" />

            {/* Text Content */}
            <div className="mt-6 z-10">
              <p className="text-2xl font-medium mb-2">{item.title}</p>
              <p className="text-sm text-white/90 leading-relaxed">
                {item.description}
              </p>
              <p className="text-xs text-white/70 mt-4">Expire {item.expiry}</p>
            </div>

            {/* Button */}
            <button className="mt-6 flex items-center gap-2 font-medium cursor-pointer z-10">
              View Offers
              <ArrowRight className="transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExclusiveOffers;
