import axios from "axios";

// http://localhost:8080/ for localhost

const apiAuthClient = axios.create({
  baseURL: "http://localhost:8080/api/auth",
  headers: { "Content-Type": "application/json" },
});

export default apiAuthClient;
