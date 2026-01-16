import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";

const ProfileDetail: React.FC = () => {
  const { user, username: storeUsername, updateProfile, isLoading } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [localUsername, setLocalUsername] = useState(storeUsername);

  const [addingEmail, setAddingEmail] = useState(false);
  const [newEmail, setNewEmail] = useState("");

  const [addingPhone, setAddingPhone] = useState(false);
  const [newPhone, setNewPhone] = useState("");

  useEffect(() => {
    setLocalUsername(storeUsername);
  }, [storeUsername]);

  if (!user) return null;

  const handleSaveUsername = async () => {
    if (!localUsername || localUsername.trim() === user.username) {
      setIsEditing(false);
      return;
    }

    try {
      await updateProfile({ username: localUsername.trim() });
      setIsEditing(false);
    } catch (err) {
      console.error("Profile update failed", err);
    }
  };

  const handleAddEmail = async () => {
    if (!newEmail.trim()) return;
    try {
      await updateProfile({ email: newEmail.trim() });
      setNewEmail("");
      setAddingEmail(false);
    } catch (err) {
      console.error("Add email failed", err);
    }
  };

  const handleAddPhone = async () => {
    if (!newPhone.trim()) return;
    try {
      await updateProfile({ phone: newPhone.trim() });
      setNewPhone("");
      setAddingPhone(false);
    } catch (err) {
      console.error("Add phone failed", err);
    }
  };

  const handleCancelUsername = () => {
    setLocalUsername(user.username);
    setIsEditing(false);
  };

  const avatarLetter = (localUsername || user.username || "?")
    .charAt(0)
    .toUpperCase();

  return (
    <>
      <Section label="Profile">
        <div className="grid grid-cols-[auto_1fr_auto] items-center gap-6 w-full">
          {/* Avatar */}
          <div className="w-14 h-14 rounded-full bg-gray-300/90 flex items-center justify-center text-white font-bold text-lg">
            {avatarLetter}
          </div>

          {/* Username / Role */}
          <div className="min-w-0">
            {isEditing ? (
              <input
                type="text"
                value={localUsername}
                onChange={(e) => setLocalUsername(e.target.value)}
                className="w-full max-w-xs border border-gray-300 rounded-md px-3 py-1.5 text-sm
                           focus:outline-none focus:ring-2 focus:ring-slate-300"
              />
            ) : (
              <>
                <p className="font-medium text-gray-900 truncate capitalize">
                  {user.username}
                </p>
                <p className="text-sm capitalize text-gray-500">{user.role}</p>
              </>
            )}
          </div>

          {/* Actions */}
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="px-2 py-1 text-sm font-medium text-gray-700 rounded-md hover:bg-slate-100"
            >
              Update profile
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={handleSaveUsername}
                disabled={isLoading}
                className="px-3 py-1 text-sm font-medium text-white bg-slate-900 rounded-md
                           hover:bg-slate-800 disabled:opacity-60"
              >
                {isLoading ? "Saving..." : "Save"}
              </button>
              <button
                onClick={handleCancelUsername}
                className="px-3 py-1 text-sm font-medium text-gray-700 rounded-md hover:bg-slate-100"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </Section>

      {/* Email Section */}
      <Section label="Email address">
        <p className="text-gray-900 break-all">{user.email}</p>

        {addingEmail ? (
          <div className="flex gap-2 mt-2">
            <input
              type="email"
              placeholder="Enter new email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-300"
            />
            <button
              onClick={handleAddEmail}
              className="px-3 py-1 text-sm font-medium text-white bg-slate-900 rounded-md hover:bg-slate-800"
            >
              Add
            </button>
            <button
              onClick={() => setAddingEmail(false)}
              className="px-3 py-1 text-sm font-medium text-gray-700 rounded-md hover:bg-slate-100"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={() => setAddingEmail(true)}
            className="text-sm font-medium text-black mt-2 hover:bg-slate-100 rounded"
          >
            + Add email address
          </button>
        )}
      </Section>

      {/* Phone Section */}
      <Section label="Phone number">
        <p className="text-gray-900">{user.phone || "—"}</p>

        {addingPhone ? (
          <div className="flex gap-2 mt-2">
            <input
              type="tel"
              placeholder="Enter new phone number"
              value={newPhone}
              onChange={(e) => setNewPhone(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-300"
            />
            <button
              onClick={handleAddPhone}
              className="px-3 py-1 text-sm font-medium text-white bg-slate-900 rounded-md hover:bg-slate-800"
            >
              Add
            </button>
            <button
              onClick={() => setAddingPhone(false)}
              className="px-3 py-1 text-sm font-medium text-gray-700 rounded-md hover:bg-slate-100"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={() => setAddingPhone(true)}
            className="text-sm font-medium text-black mt-2 hover:bg-slate-100 rounded"
          >
            + Add phone number
          </button>
        )}
      </Section>

      <Section label="Member since">
        <p className="text-gray-900">
          {new Date(user.createdAt).toLocaleDateString("en-IN")}
        </p>
      </Section>
    </>
  );
};

export default ProfileDetail;

/* ---------------------------------------------------------------- */
const Section = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <div className="border-b border-gray-300 py-5 last:border-b-0">
    <p className="text-sm font-medium text-gray-500 mb-2">{label}</p>
    {children}
  </div>
);
