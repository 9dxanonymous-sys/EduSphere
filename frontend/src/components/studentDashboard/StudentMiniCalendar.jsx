import { motion } from "framer-motion";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { CalendarDays } from "lucide-react";
import { useState } from "react";

function StudentMiniCalendar() {
  const [date, setDate] = useState(new Date());

  const studentDashboardTips = [
    {
      title: "Stay Organized",
      subtitle:
        "Manage your academic activities efficiently.",
    },
    {
      title: "Monitor Progress",
      subtitle:
        "Keep track of your semester performance.",
    },
    {
      title: "Stay Informed",
      subtitle:
        "Regularly check course updates and announcements.",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-3xl shadow-xl p-6"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-blue-100 p-3 rounded-xl">
          <CalendarDays className="text-blue-600" />
        </div>

        <div>
          <h2 className="text-2xl font-bold">
            Academic Calendar
          </h2>

          <p className="text-gray-500">
            Keep track of important dates.
          </p>
        </div>
      </div>

      {/* Calendar */}
      <Calendar
        onChange={setDate}
        value={date}
        className="w-full border-0 rounded-2xl"
      />

      {/* Selected Date Card */}
      <div className="mt-6 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-5">
        <p className="text-gray-500">
          Selected Date
        </p>

        <h3 className="font-bold text-lg mt-2">
          {date.toDateString()}
        </h3>

        <p className="text-sm text-gray-600 mt-2">
          Stay updated with your academic activities
          and university schedule.
        </p>
      </div>

      {/* Student Dashboard Tips */}
      <div className="mt-6">
        <h3 className="text-lg font-bold mb-4">
          Student Dashboard Tips
        </h3>

        <div className="space-y-3">
          {studentDashboardTips.map((item, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-xl p-4 hover:bg-blue-50 transition-all duration-300"
            >
              <p className="font-semibold text-gray-800">
                {item.title}
              </p>

              <p className="text-sm text-gray-500 mt-1">
                {item.subtitle}
              </p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default StudentMiniCalendar;