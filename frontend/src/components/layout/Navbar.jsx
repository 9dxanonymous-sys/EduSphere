import { useLocation } from "react-router-dom";
import {
  Bell,
  UserCircle2,
  CalendarDays,
} from "lucide-react";

function Navbar() {

  const user = JSON.parse(localStorage.getItem("user"));

  const location = useLocation();

  const titles = {
    "/admin/dashboard": "Dashboard",
    "/admin/students": "Students Management",
    "/admin/teachers": "Teachers Management",
    "/admin/courses": "Courses Management",
    "/admin/users": "Users Management",
    "/admin/reports": "Reports",
    "/admin/settings": "Settings",
  };

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (

    <header className="sticky top-0 z-40 h-16 px-8 flex justify-between items-center bg-white/80 backdrop-blur-xl border-b border-gray-200 shadow-sm">

      {/* Left */}

      <div>

        <h1 className="text-2xl font-bold text-gray-800">

          {titles[location.pathname] || "Admin Panel"}

        </h1>

        <p className="text-sm text-gray-500">

          Welcome back,

          <span className="font-semibold text-blue-600">

            {" "}{user?.username}

          </span>

        </p>

      </div>

      {/* Right */}

      <div className="flex items-center gap-4">

        {/* Date */}

        <div className="hidden xl:flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-xl">

          <CalendarDays
            size={18}
            className="text-blue-600"
          />

          <span className="text-sm text-gray-700">

            {today}

          </span>

        </div>

        {/* Notification */}

        <button className="relative bg-white border p-3 rounded-xl shadow-sm hover:bg-blue-50 hover:shadow-md transition">

          <Bell
            size={20}
            className="text-gray-700"
          />

          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>

        </button>

        {/* User */}

        <div className="flex items-center gap-3 bg-white border rounded-xl px-4 py-2 shadow-sm hover:shadow-md transition">

          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center text-white">

            <UserCircle2 size={24} />

          </div>

          <div className="hidden md:block">

            <h3 className="font-semibold text-gray-800">

              {user?.username}

            </h3>

            <p className="text-xs text-gray-500">

              Administrator

            </p>

          </div>

        </div>

      </div>

    </header>

  );

}

export default Navbar;