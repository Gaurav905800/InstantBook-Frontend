import { useCallback } from "react";
import { useHotelStore } from "../store/useHotelStore";
import useFetch from "./useFetch";
import apiHotelClient from "../api/ApiHotelClient";
import type { Hotel } from "../schema/hotel";

interface HotelResponse {
  hotels: Hotel[];
}

interface HotelByIdResponse {
  hotel: Hotel;
}

const useHotel = () => {
  const { request, isLoading, error } = useFetch();

  const { hotels, hotelById, setHotels, setHotelById } = useHotelStore();

  const fetchHotels = useCallback(async () => {
    const res = await request<HotelResponse>({
      client: apiHotelClient,
      url: "/",
    });

    if (res?.hotels) {
      setHotels(res.hotels);
    }
  }, [request, setHotels]);

  const fetchHotelById = useCallback(
    async (id: string): Promise<Hotel | null> => {
      if (hotelById[id]) {
        return hotelById[id];
      }
      const res = await request<HotelByIdResponse>({
        client: apiHotelClient,
        url: `/${id}`,
      });

      if (res?.hotel) {
        setHotelById(res.hotel);
        return res.hotel;
      }

      return null;
    },
    [hotelById, request, setHotelById]
  );

  return {
    hotels,
    fetchHotels,
    fetchHotelById,
    isLoading,
    error,
  };
};

export default useHotel;
