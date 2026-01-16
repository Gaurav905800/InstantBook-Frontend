export type Location = {
  lat: number;
  lng: number;
};

export type Hotel = {
  _id: string;
  name: string;
  description: string;
  facilities: string[];
  address: string;
  city: string;
  country: string;
  rating: number;
  location: Location;
  images: string[];
  rooms: Room[];
  ownerId: string;
  isFeatured: boolean;
};

export type RoomType =
  | "standard"
  | "deluxe"
  | "super deluxe"
  | "suite"
  | "family room";

export type BedType = "king" | "queen" | "twin" | "double" | "single";

export type Amenity =
  | "wifi"
  | "tv"
  | "balcony"
  | "minibar"
  | "bathtub"
  | "air_conditioner"
  | "coffee_maker";

export type ViewType = "city" | "sea" | "garden" | "mountain";

export interface Room {
  _id: string;
  name: RoomType;
  description?: string;
  price: number;
  maxGuests: number;
  baseGuests?: number;
  bedType: BedType;
  size?: number; // sq ft
  viewType?: ViewType;
  images: string[];
  amenities: Amenity[];
  availableRooms: number;
  isAvailable?: boolean;
  rating?: number;
}
