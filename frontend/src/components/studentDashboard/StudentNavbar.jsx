import { useLocation } from "react-router-dom";

import {
  Bell,
  CalendarDays,
  UserCircle2,
} from "lucide-react";

function StudentNavbar() {

  const user = JSON.parse(localStorage.getItem("user"));

  const location = useLocation();

  const titles = {

    "/student/dashboard": "Dashboard",

    "/student/courses": "My Courses",

    "/student/attendance": "Attendance",

    "/student/assignments": "Assignments",

    "/student/grades": "Grades",

    "/student/announcements": "Announcements",

    "/student/settings": "Settings",

  };

  const today = new Date().toLocaleDateString("en-US", {

    weekday: "long",

    day: "numeric",

    month: "long",

    year: "numeric",

  });

  return (

    <header

      className="

      sticky

      top-0

      z-40

      h-20

      px-8

      flex

      justify-between

      items-center

      bg-white

      border-b

      border-gray-200

      shadow-sm

      "

    >

      <div>

        <h1 className="text-3xl font-bold text-gray-800">

          {titles[location.pathname] || "Student Panel"}

        </h1>

        <p className="text-gray-500 mt-1">

          Welcome back,
          <span className="font-semibold text-blue-600">
            {" "}{user?.username}
          </span>

        </p>

      </div>

      <div className="flex items-center gap-5">

        <div className="hidden xl:flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-2xl">

          <CalendarDays
            size={18}
            className="text-blue-600"
          />

          <span className="text-sm">
            {today}
          </span>

        </div>

        <button

          className="

          relative

          bg-white

          border

          p-3

          rounded-2xl

          shadow-sm

          hover:bg-blue-50

          "

        >

          <Bell
            size={22}
            className="text-gray-700"
          />

          <span

            className="

            absolute

            top-2

            right-2

            w-2.5

            h-2.5

            bg-red-500

            rounded-full

            animate-pulse

            "

          />

        </button>

        <div

          className="

          flex

          items-center

          gap-3

          bg-white

          border

          rounded-2xl

          px-4

          py-2

          shadow-sm

          "

        >

          <div

            className="

            w-11

            h-11

            rounded-full

            bg-gradient-to-r

            from-blue-600

            to-cyan-500

            flex

            items-center

            justify-center

            text-white

            "

          >

            <UserCircle2 size={26}/>

          </div>

          <div>

            <h3 className="font-semibold">
              {user?.username}
            </h3>

            <p className="text-sm text-gray-500">
              Student
            </p>

          </div>

        </div>

      </div>

    </header>

  );

}

export default StudentNavbar;