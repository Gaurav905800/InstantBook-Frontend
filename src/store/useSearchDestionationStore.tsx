import { create } from "zustand";

interface SearchDestinationType {
  destination: string;
  checkInDate: string;
  checkOutDate: string;
  guests: number;

  setDestination: (destination: string) => void;
  setCheckInDate: (date: string) => void;
  setCheckOutDate: (date: string) => void;
  setGuests: (guests: number) => void;
}

const useSearchDestinationStore = create<SearchDestinationType>((set) => ({
  destination: "",
  checkInDate: "",
  checkOutDate: "",
  guests: 1,

  setDestination: (destination) => set({ destination }),
  setCheckInDate: (checkInDate) => set({ checkInDate }),
  setCheckOutDate: (checkOutDate) => set({ checkOutDate }),
  setGuests: (guests) => set({ guests }),
}));

export default useSearchDestinationStore;
