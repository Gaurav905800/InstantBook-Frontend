import axios from "axios";

// http://localhost:8080/ for localhost

const apiAuthClient = axios.create({
  baseURL: "https://instantbook-backend-y20a.onrender.com/api/auth",
  timeout: 5000,
  headers: { "Content-Type": "application/json" },
});

export default apiAuthClient;
