import React, { useState } from "react";
import { X, User, Shield, CreditCard } from "lucide-react";
import useAuth from "../hooks/useAuth";
import ProfileDetail from "./ProfileDetail";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose }) => {
  const { user } = useAuth();

  const [activeTab, setActiveTab] = useState<
    "profile" | "security" | "billing"
  >("profile");

  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-5xl rounded-xl shadow-xl overflow-hidden relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X size={20} />
        </button>

        <div className="flex min-h-[500px] p-2">
          {/* Sidebar */}
          <aside className="w-64 border-r border-gray-300 bg-white px-4 py-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              Account
            </h2>

            <nav className="space-y-1">
              <SidebarItem
                icon={<User size={16} />}
                label="Profile"
                active={activeTab === "profile"}
                onClick={() => setActiveTab("profile")}
              />
              <SidebarItem
                icon={<Shield size={16} />}
                label="Security"
                active={activeTab === "security"}
                onClick={() => setActiveTab("security")}
              />
              <SidebarItem
                icon={<CreditCard size={16} />}
                label="Billing"
                active={activeTab === "billing"}
                onClick={() => setActiveTab("billing")}
              />
            </nav>
          </aside>

          {/* Content */}
          <main className="flex-1 px-4 sm:px-8 py-6 overflow-y-auto">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-6">
              {activeTab === "profile" && "Profile details"}
              {activeTab === "security" && "Security"}
              {activeTab === "billing" && "Billing"}
            </h3>

            {activeTab === "profile" && <ProfileDetail />}
            {activeTab === "security" && <div>Security content here</div>}
            {activeTab === "billing" && <div>Billing content here</div>}
          </main>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;

const SidebarItem = ({
  icon,
  label,
  active = false,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}) => (
  <div
    onClick={onClick}
    className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium cursor-pointer
      ${
        active
          ? "bg-slate-200/85 text-gray-900"
          : "text-gray-600 hover:bg-white/70"
      }`}
  >
    {icon}
    {label}
  </div>
);
