import { motion } from "framer-motion";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { CalendarDays } from "lucide-react";
import { useState } from "react";

function TeacherMiniCalendar() {

  const [date, setDate] = useState(new Date());

  return (

    <motion.div

      initial={{ opacity: 0, y: 30 }}

      animate={{ opacity: 1, y: 0 }}

      className="bg-white rounded-3xl shadow-xl p-6"

    >

      <div className="flex items-center gap-3 mb-6">

        <div className="bg-blue-100 p-3 rounded-xl">

          <CalendarDays className="text-blue-600" />

        </div>

        <div>

          <h2 className="text-2xl font-bold">

            Academic Calendar

          </h2>

          <p className="text-gray-500">

            Manage your schedule

          </p>

        </div>

      </div>

      <Calendar

        onChange={setDate}

        value={date}

        className="w-full border-0 rounded-2xl"

      />

      <div className="mt-6 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-5">

        <p className="text-gray-500">

          Selected Date

        </p>

        <h3 className="font-bold text-lg mt-2">

          {date.toDateString()}

        </h3>

      </div>

    </motion.div>

  );

}

export default TeacherMiniCalendar;