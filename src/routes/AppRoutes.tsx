import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Layout";

import Home from "../pages/Home";
import AllRooms from "../pages/AllRooms";
import AllHotels from "../pages/AllHotels";
import HotelRooms from "../pages/HotelRooms";
import RoomDetail from "../pages/RoomDetail";
import MyBookings from "../pages/MyBookings";

import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import NotFound from "../pages/NotFound";

import Dashboard from "../pages/dashboard/Dashboard";
import Settings from "../pages/Settings";
import AdminDashboard from "../pages/dashboard/AdminDashboard";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Layout */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/rooms" element={<AllRooms />} />
          <Route path="/hotels" element={<AllHotels />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="/hotels/:id/rooms" element={<HotelRooms />} />
          <Route
            path="/hotel/:hotelId/rooms/:roomId"
            element={<RoomDetail />}
          />
        </Route>

        {/* Dashboard Layout */}
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<AdminDashboard />} />
          <Route path="owner" element={<AdminDashboard />} />
          <Route path="owner/settings" element={<Settings />} />
        </Route>

        {/* Auth */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
