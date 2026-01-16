import { create } from "zustand";
import type { Hotel } from "../schema/hotel";

interface HotelStore {
  hotels: Hotel[];
  hotelById: Record<string, Hotel>;

  setHotels: (data: Hotel[]) => void;
  setHotelById: (hotel: Hotel) => void;
}

export const useHotelStore = create<HotelStore>((set) => ({
  hotels: [],
  hotelById: {},

  setHotels: (data) => set({ hotels: data }),

  setHotelById: (hotel) =>
    set((state) => ({
      hotelById: {
        ...state.hotelById,
        [hotel._id]: hotel,
      },
    })),
}));
