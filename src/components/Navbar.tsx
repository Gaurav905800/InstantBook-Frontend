// components/NavBar.tsx
import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Component,
  TextAlignEnd,
  Search,
  SquareX,
  PersonStanding,
  User,
  ChevronDown,
  LogOut,
} from "lucide-react";
import useAuth from "../hooks/useAuth";
import ProfileModal from "./ProfileModal";

type Links = {
  name: string;
  path: string;
};

const NavBar: React.FC = () => {
  const navLinks: Links[] = [
    { name: "Home", path: "/" },
    { name: "Hotels", path: "/hotels" },
    { name: "Experience", path: "/" },
    { name: "About", path: "/" },
  ];

  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);

  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const { user, logout } = useAuth();

  // Refs for detecting clicks outside dropdown
  const dropdownRef = useRef<HTMLDivElement>(null);
  const avatarButtonRef = useRef<HTMLButtonElement>(null);
  const mobileAvatarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isHomePage) {
      setIsScrolled(true);
      return;
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleLogoutClick = () => {
    logout();
    navigate("/");
    setIsDropdownOpen(false);
  };

  const toggleDropdown = (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    setIsDropdownOpen((prev) => !prev);
  };

  // Close dropdown when clicking outside - FIXED VERSION
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // If dropdown is not open, do nothing
      if (!isDropdownOpen) return;

      const target = event.target as HTMLElement;

      // Check if click is on desktop avatar button
      const isClickOnDesktopAvatar = avatarButtonRef.current?.contains(target);
      // Check if click is on mobile avatar button
      const isClickOnMobileAvatar = mobileAvatarRef.current?.contains(target);
      // Check if click is inside dropdown menu
      const isClickInsideDropdown = dropdownRef.current?.contains(target);

      // Only close dropdown if click is NOT on avatar buttons AND NOT inside dropdown
      if (
        !isClickOnDesktopAvatar &&
        !isClickOnMobileAvatar &&
        !isClickInsideDropdown
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isDropdownOpen]); // Add isDropdownOpen as dependency

  // Handle dropdown button clicks
  const handleDropdownAction = (path: string) => {
    navigate(path);
    setIsDropdownOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full flex items-center justify-between px-4 md:px-16 lg:px-24 xl:px-32 transition-all duration-500 z-50 ${
          isScrolled
            ? "bg-white/80 shadow-md text-gray-700 backdrop-blur-lg py-3 md:py-4"
            : " py-4 md:py-6"
        }`}
      >
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <Component
            className={isScrolled ? "text-gray-700" : "text-white"}
            style={{ height: "35px", width: "35px" }}
          />
          <p
            className={`text-2xl font-semibold ${
              isScrolled ? "text-gray-700" : "text-white"
            }`}
            style={{ fontFamily: "Chalkboard" }}
          >
            InstantBook
          </p>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-4 lg:gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`group flex flex-col gap-0.5 ${
                isScrolled ? "text-gray-700" : "text-white"
              }`}
            >
              {link.name}
              <div
                className={`h-0.5 w-0 group-hover:w-full transition-all duration-300 ${
                  isScrolled ? "bg-gray-700" : "bg-white"
                }`}
              />
            </Link>
          ))}

          {user?.role === "admin" && (
            <button
              onClick={() => navigate("/dashboard")}
              className={`border px-4 py-1 text-sm font-light rounded-full transition-all ${
                isScrolled ? "text-black" : "text-white"
              }`}
            >
              Dashboard
            </button>
          )}
        </div>

        {/* Desktop Right */}
        <div className="hidden md:flex items-center gap-4">
          <Search
            className={`h-6 w-6 transition-all duration-500 hover:cursor-pointer ${
              isScrolled ? "text-gray-700" : "text-white"
            }`}
          />

          {user ? (
            <div className="relative">
              {/* Avatar Button */}
              <button
                ref={avatarButtonRef}
                onClick={toggleDropdown}
                className="flex items-center gap-2 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-200"
              >
                {/* Circular Avatar */}
                <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center overflow-hidden">
                  {user.username ? (
                    <span className="text-white font-semibold text-sm">
                      {user.username.charAt(0).toUpperCase()}
                    </span>
                  ) : (
                    <User className="h-5 w-5 text-white" />
                  )}
                </div>
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${
                    isDropdownOpen ? "rotate-180" : ""
                  } ${isScrolled ? "text-gray-700" : "text-white"}`}
                />
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div
                  ref={dropdownRef}
                  className="absolute top-full right-0 mt-2 w-48 bg-white shadow-lg rounded-xl border border-gray-100 py-2 z-50 animate-in slide-in-from-top-2 duration-200"
                  onClick={(e) => e.stopPropagation()} // Prevent click inside from closing
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDropdownAction("/my-bookings");
                    }}
                    className="flex items-center gap-3 w-full text-left px-4 py-3 hover:bg-gray-50 rounded-lg transition-all duration-200"
                  >
                    <PersonStanding className="h-5 w-5 text-gray-600" />
                    <span className="text-sm font-medium text-gray-800">
                      My Bookings
                    </span>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsProfileModalOpen(true);
                      setIsDropdownOpen(false);
                      // handleDropdownAction("/profile");
                    }}
                    className="flex items-center gap-3 w-full text-left px-4 py-3 hover:bg-gray-50 rounded-lg transition-all duration-200"
                  >
                    <User className="h-5 w-5 text-gray-600" />
                    <span className="text-sm font-medium text-gray-800">
                      Profile
                    </span>
                  </button>
                  {user.role === "admin" && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDropdownAction("/dashboard");
                      }}
                      className="flex items-center gap-3 w-full text-left px-4 py-3 hover:bg-gray-50 rounded-lg transition-all duration-200"
                    >
                      <Component className="h-5 w-5 text-gray-600" />
                      <span className="text-sm font-medium text-gray-800">
                        Dashboard
                      </span>
                    </button>
                  )}
                  <div className="border-t border-gray-100 my-1"></div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLogoutClick();
                    }}
                    className="flex items-center gap-3 w-full text-left px-4 py-3 hover:bg-red-50 text-red-600 rounded-lg transition-all duration-200"
                  >
                    <LogOut className="h-5 w-5" />
                    <span className="text-sm font-medium">Logout</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={handleLoginClick}
              className={`px-8 py-2.5 rounded-full ml-4 transition-all duration-500 ${
                isScrolled ? "bg-black text-white" : "bg-white text-black"
              }`}
            >
              Login
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div
          className={`flex items-center gap-3 md:hidden ${
            isScrolled ? "text-gray-800" : "text-white"
          }`}
        >
          {user && (
            <div className="relative">
              <div
                ref={mobileAvatarRef}
                className="w-8 h-8 rounded-full bg-black flex items-center justify-center cursor-pointer"
                onClick={toggleDropdown}
              >
                <span className="text-white font-semibold text-xs">
                  {user.username?.charAt(0).toUpperCase() || "U"}
                </span>
              </div>
              {isDropdownOpen && (
                <div
                  ref={dropdownRef}
                  className="absolute top-full right-0 mt-2 w-48 bg-white text-gray-800 shadow-lg rounded-xl border py-2 z-50"
                  onClick={(e) => e.stopPropagation()} // Prevent click inside from closing
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDropdownAction("/my-bookings");
                    }}
                    className="flex items-center gap-3 w-full text-left px-4 py-3 hover:bg-gray-50"
                  >
                    <PersonStanding className="h-5 w-5" />
                    My Bookings
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsProfileModalOpen(true);
                      setIsDropdownOpen(false);
                    }}
                    className="flex items-center gap-3 w-full text-left px-4 py-3 hover:bg-gray-50"
                  >
                    <User className="h-5 w-5" />
                    Profile
                  </button>
                  {user.role === "admin" && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDropdownAction("/dashboard");
                      }}
                      className="flex items-center gap-3 w-full text-left px-4 py-3 hover:bg-gray-50 rounded-lg transition-all duration-200"
                    >
                      <Component className="h-5 w-5 text-gray-600" />
                      <span className="text-sm font-medium text-gray-800">
                        Dashboard
                      </span>
                    </button>
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLogoutClick();
                    }}
                    className="flex items-center gap-3 w-full text-left px-4 py-3 hover:bg-red-50 text-red-600"
                  >
                    <LogOut className="h-5 w-5" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}

          <TextAlignEnd
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className={`h-6 w-6 cursor-pointer ${isScrolled ? "invert" : ""}`}
          />
        </div>

        {/* Mobile Menu */}
        <div
          className={`fixed top-0 left-0 w-full h-screen bg-white flex flex-col md:hidden items-center justify-center gap-6 font-medium text-gray-800 transition-all duration-500 ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <SquareX
            className="absolute top-5 right-6 cursor-pointer"
            onClick={() => setIsMenuOpen(false)}
          />

          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsMenuOpen(false)}
              className="text-lg hover:text-blue-600 transition-colors"
            >
              {link.name}
            </Link>
          ))}

          {user?.role === "admin" && (
            <button
              onClick={() => {
                setIsMenuOpen(false);
                navigate("/dashboard");
              }}
              className="border px-4 py-1 text-sm font-light rounded-full hover:bg-gray-100"
            >
              Dashboard
            </button>
          )}

          {!user && (
            <button
              onClick={() => {
                setIsMenuOpen(false);
                handleLoginClick();
              }}
              className="bg-black text-white px-8 py-2.5 rounded-full hover:bg-gray-800 transition-colors"
            >
              Login
            </button>
          )}
        </div>
      </nav>
      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
      />
    </>
  );
};

export default NavBar;
