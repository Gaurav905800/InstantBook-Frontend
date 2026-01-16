import React, { useRef, useEffect } from "react";
import {
  User,
  ChevronDown,
  PersonStanding,
  LogOut,
  Component,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

interface CircularAvatarProps {
  user: any; // Your user type
  isScrolled?: boolean;
  className?: string;
  onProfileClick?: () => void;
}

const CircularAvatar: React.FC<CircularAvatarProps> = ({
  user,
  isScrolled = false,
  className = "",
  onProfileClick,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const avatarButtonRef = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const toggleDropdown = (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    setIsDropdownOpen((prev) => !prev);
  };

  const handleDropdownAction = (path: string) => {
    navigate(path);
    setIsDropdownOpen(false);
  };

  const handleLogoutClick = () => {
    logout();
    navigate("/");
    setIsDropdownOpen(false);
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!isDropdownOpen) return;
      const target = event.target as HTMLElement;

      if (
        !avatarButtonRef.current?.contains(target) &&
        !dropdownRef.current?.contains(target)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isDropdownOpen]);

  return (
    <div className="relative">
      {/* Avatar Button */}
      <button
        ref={avatarButtonRef}
        onClick={toggleDropdown}
        className={`flex items-center gap-2 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-200 ${className}`}
      >
        {/* Circular Avatar */}
        <div className="w-10 h-10 rounded-full bg-linear-to-br from-slate-900 to-slate-700 flex items-center justify-center overflow-hidden shadow-sm">
          {user?.username ? (
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
          } ${isScrolled ? "text-slate-700" : "text-slate-400"}`}
        />
      </button>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div
          ref={dropdownRef}
          className="absolute top-full right-0 mt-2 w-48 bg-white/95 backdrop-blur-sm shadow-xl rounded-xl border border-slate-100 py-2 z-50 animate-in slide-in-from-top-2 duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDropdownAction("/my-bookings");
            }}
            className="flex items-center gap-3 w-full text-left px-4 py-3 hover:bg-slate-50 rounded-lg transition-all duration-200"
          >
            <PersonStanding className="h-5 w-5 text-slate-600" />
            <span className="text-sm font-medium text-slate-800">
              My Bookings
            </span>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsDropdownOpen(false);
              onProfileClick?.();
            }}
            className="flex items-center gap-3 w-full text-left px-4 py-3 hover:bg-slate-50 rounded-lg transition-all duration-200"
          >
            <User className="h-5 w-5 text-slate-600" />
            <span className="text-sm font-medium text-slate-800">Profile</span>
          </button>

          {user?.role === "admin" && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDropdownAction("/dashboard");
              }}
              className="flex items-center gap-3 w-full text-left px-4 py-3 hover:bg-slate-50 rounded-lg transition-all duration-200"
            >
              <Component className="h-5 w-5 text-slate-600" />
              <span className="text-sm font-medium text-slate-800">
                Dashboard
              </span>
            </button>
          )}

          <div className="border-t border-slate-100 my-1"></div>

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
  );
};

export default CircularAvatar;
