type ExclusiveOffersType = {
  _id: number;
  offerPercent: number;
  title: string;
  description: string;
  expiry: string;
  image: string;
};

export const exclusiveOffers: ExclusiveOffersType[] = [
  {
    _id: 1,
    offerPercent: 20,
    title: "Summer Escape Deal",
    description:
      "Enjoy thoughtfully designed stays with summer savings, complimentary breakfast, and relaxing experiences.",
    expiry: "2025-06-30",
    image:
      "https://mmhotels.in/wp-content/uploads/2024/01/istockphoto-104731717-612x612-1.jpg",
  },
  {
    _id: 2,
    offerPercent: 35,
    title: "Monsoon Special Offer",
    description:
      "Experience serene monsoon getaways with exclusive discounts on premium rooms and scenic views.",
    expiry: "2025-08-15",
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb",
  },
  {
    _id: 3,
    offerPercent: 40,
    title: "Early Bird Booking",
    description:
      "Plan ahead and unlock significant savings by booking early for luxury and comfort-filled stays.",
    expiry: "2025-09-30",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
  },
  {
    _id: 4,
    offerPercent: 25,
    title: "Festive Celebration Offer",
    description:
      "Celebrate special moments with exclusive festive discounts and premium hospitality experiences.",
    expiry: "2025-11-15",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
  },
];
