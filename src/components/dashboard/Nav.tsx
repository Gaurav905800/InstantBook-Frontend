import React from "react";
import { Link } from "react-router-dom";
import CircularAvatar from "../CircularAvatar";
import useAuth from "../../hooks/useAuth";
import { Component } from "lucide-react";

const Nav: React.FC = () => {
  const { user } = useAuth();

  return (
    <nav className="bg-white shadow-sm border-b border-slate-200 px-10 py-4 flex items-center justify-between">
      {/* Logo Left */}
      <Link to="/" className="flex items-center gap-2">
        <Component
          className="text-gray-700"
          style={{ height: "35px", width: "35px" }}
        />
        <p
          className={`text-2xl font-semibold text-gray-700 `}
          style={{ fontFamily: "Chalkboard" }}
        >
          InstantBook
        </p>
      </Link>

      <div className="flex items-center gap-4">
        <CircularAvatar user={user} />
      </div>
    </nav>
  );
};

export default Nav;
