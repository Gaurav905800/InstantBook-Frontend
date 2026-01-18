import axios from "axios";

// http://localhost:8080/ for localhost
// https://instantbook-backend-y20a.onrender.com for production

const apiAuthClient = axios.create({
  baseURL: "https://instantbook-backend-y20a.onrender.com/api/auth",
  headers: { "Content-Type": "application/json" },
});

export default apiAuthClient;
