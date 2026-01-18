import axios from "axios";

// http://localhost:8080/ for localhost

const apiHotelClient = axios.create({
  baseURL: "http://localhost:8080/api/hotel",
  headers: { "Content-Type": "application/json" },
});

export default apiHotelClient;
