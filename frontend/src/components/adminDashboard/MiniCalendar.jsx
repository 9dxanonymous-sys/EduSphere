import { motion } from "framer-motion";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useState } from "react";
import { CalendarDays } from "lucide-react";

function MiniCalendar() {

  const [date, setDate] = useState(new Date());

  return (

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-3xl border border-gray-100 shadow-lg p-6"
    >

      <div className="flex items-center gap-3 mb-6">

        <div className="bg-blue-100 p-3 rounded-xl">

          <CalendarDays
            size={22}
            className="text-blue-600"
          />

        </div>

        <div>

          <h2 className="text-2xl font-bold text-gray-800">
            Academic Calendar
          </h2>

          <p className="text-sm text-gray-500">
            Schedule & Important Dates
          </p>

        </div>

      </div>

      <Calendar
        onChange={setDate}
        value={date}
        className="premium-calendar border-0 rounded-2xl w-full"
      />

      <div className="mt-6 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-5 border border-blue-100">

        <p className="text-sm text-gray-500">
          Selected Date
        </p>

        <h3 className="text-lg font-semibold text-gray-800 mt-2">
          {date.toDateString()}
        </h3>

      </div>

    </motion.div>

  );

}

export default MiniCalendar;