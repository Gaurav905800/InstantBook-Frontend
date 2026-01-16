import { Building2, BedDouble, CalendarCheck, IndianRupee } from "lucide-react";

function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-sm opacity-80">Overview of your hotels & bookings</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 text-white">
        <StatCard
          title="Total Hotels"
          value="4"
          icon={<Building2 size={22} />}
        />
        <StatCard
          title="Total Rooms"
          value="128"
          icon={<BedDouble size={22} />}
        />
        <StatCard
          title="Bookings"
          value="342"
          icon={<CalendarCheck size={22} />}
        />
        <StatCard
          title="Revenue"
          value="₹4,80,000"
          icon={<IndianRupee size={22} />}
        />
      </div>

      {/* Content Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 text-white">
        {/* Recent Bookings */}
        <div className="xl:col-span-2 bg-slate-900 rounded-xl border border-slate-700">
          <div className="px-6 py-4 border-b border-slate-700">
            <h2 className="font-semibold">Recent Bookings</h2>
          </div>

          <table className="w-full text-sm">
            <thead className="bg-slate-800 opacity-90">
              <tr>
                <th className="px-6 py-3 text-left">Guest</th>
                <th className="px-6 py-3 text-left">Hotel</th>
                <th className="px-6 py-3 text-left">Room</th>
                <th className="px-6 py-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  guest: "Rahul Sharma",
                  hotel: "Sea View Resort",
                  room: "Deluxe",
                  status: "Confirmed",
                },
                {
                  guest: "Anita Verma",
                  hotel: "Hilltop Inn",
                  room: "Suite",
                  status: "Pending",
                },
                {
                  guest: "Amit Patel",
                  hotel: "City Lodge",
                  room: "Standard",
                  status: "Cancelled",
                },
              ].map((b, i) => (
                <tr key={i} className="border-t border-slate-700">
                  <td className="px-6 py-4">{b.guest}</td>
                  <td className="px-6 py-4">{b.hotel}</td>
                  <td className="px-6 py-4">{b.room}</td>
                  <td className="px-6 py-4">
                    <StatusBadge status={b.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Quick Actions */}
        <div className="bg-slate-900 rounded-xl border border-slate-700 p-6 space-y-4">
          <h2 className="font-semibold">Quick Actions</h2>

          <button className="w-full px-4 py-3 rounded-lg bg-white text-black hover:opacity-90">
            Add New Hotel
          </button>
          <button className="w-full px-4 py-3 rounded-lg border border-slate-600 hover:bg-slate-800">
            Add Rooms
          </button>
          <button className="w-full px-4 py-3 rounded-lg border border-slate-600 hover:bg-slate-800">
            View Bookings
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;

/* ---------------- Sub Components ---------------- */

function StatCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="bg-slate-900 rounded-xl border border-slate-700 p-6 flex items-center justify-between">
      <div>
        <p className="text-sm opacity-80">{title}</p>
        <p className="text-2xl font-bold mt-1">{value}</p>
      </div>
      <div className="p-3 rounded-lg bg-slate-800 text-white">{icon}</div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const base = "px-3 py-1 rounded-full text-xs font-medium text-white";

  if (status === "Confirmed")
    return <span className={`${base} bg-green-600`}>Confirmed</span>;

  if (status === "Pending")
    return <span className={`${base} bg-yellow-500`}>Pending</span>;

  return <span className={`${base} bg-red-600`}>Cancelled</span>;
}
