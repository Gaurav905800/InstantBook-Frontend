import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  List,
  Plus,
  CalendarCheck,
  Settings,
} from "lucide-react";

interface MenuItem {
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  path: string;
  group: "main" | "hotel" | "booking" | "settings";
}

const Sidebar: React.FC = () => {
  const menuItems: MenuItem[] = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard",
      group: "main",
    },
    {
      label: "Hotel List",
      icon: List,
      path: "/dashboard/owner/hotels",
      group: "hotel",
    },
    {
      label: "Add Hotel",
      icon: Plus,
      path: "/dashboard/owner/hotels/add",
      group: "hotel",
    },
    {
      label: "Bookings",
      icon: CalendarCheck,
      path: "/dashboard/owner/bookings",
      group: "booking",
    },
    {
      label: "Settings",
      icon: Settings,
      path: "/dashboard/owner/settings",
      group: "settings",
    },
  ];

  const baseClass =
    "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200";

  const inactiveClass =
    "text-slate-700 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-slate-700/60";

  const activePrimary =
    "bg-slate-900 text-white shadow-md dark:bg-white dark:text-slate-900";

  const activeSecondary =
    "bg-slate-800 text-white shadow-sm dark:bg-slate-200 dark:text-slate-900";

  const renderItem = (item: MenuItem, isPrimary = false, indent = false) => (
    <NavLink
      key={item.path}
      to={item.path}
      className={({ isActive }) =>
        `${baseClass} ${indent ? "ml-4" : ""} ${
          isActive
            ? isPrimary
              ? activePrimary
              : activeSecondary
            : inactiveClass
        }`
      }
    >
      {({ isActive }) => (
        <>
          <item.icon
            size={18}
            className={
              isActive ? "text-white dark:text-slate-900" : "text-slate-500"
            }
          />
          <span>{item.label}</span>
        </>
      )}
    </NavLink>
  );

  return (
    <aside className="h-screen w-64 bg-slate-50 dark:bg-slate-900 border-r border-slate-200 dark:border-slate-700 flex flex-col">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 text-lg font-semibold border-b border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white">
        Hotel Admin
      </div>

      <nav className="flex-1 px-4 py-6 space-y-6">
        {/* Dashboard */}
        {menuItems
          .filter((i) => i.group === "main")
          .map((i) => renderItem(i, true))}

        {/* Hotels */}
        <div>
          <p className="px-4 mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
            Hotels
          </p>
          {menuItems
            .filter((i) => i.group === "hotel")
            .map((i) => renderItem(i, false, true))}
        </div>

        {/* Bookings */}
        {menuItems
          .filter((i) => i.group === "booking")
          .map((i) => renderItem(i))}

        {/* Settings */}
        {menuItems
          .filter((i) => i.group === "settings")
          .map((i) => renderItem(i))}
      </nav>
    </aside>
  );
};

export default Sidebar;
