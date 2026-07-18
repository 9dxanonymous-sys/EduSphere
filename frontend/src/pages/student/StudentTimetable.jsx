import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  CalendarClock,
  Clock3,
  MapPin,
  User,
} from "lucide-react";

import { getMyStudentTimetable } from "../../services/timetableService";

const DAY_ORDER = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

function formatTime(t) {
  if (!t) return "";
  return t.slice(0, 5);
}

function StudentTimetable() {

  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTimetable();
  }, []);

  const loadTimetable = async () => {

    try {

      const data = await getMyStudentTimetable();
      setEntries(Array.isArray(data) ? data : []);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  if (loading) {

    return (
      <div className="flex justify-center items-center h-72">
        <h2 className="text-xl font-semibold text-gray-500">
          Loading Timetable...
        </h2>
      </div>
    );

  }

  const groupedByDay = DAY_ORDER.map((day) => ({
    day,
    items: entries
      .filter((e) => e.day_of_week === day)
      .sort((a, b) => (a.start_time > b.start_time ? 1 : -1)),
  }));

  return (

    <div className="space-y-8">

      <motion.div

        initial={{ opacity: 0, y: -20 }}

        animate={{ opacity: 1, y: 0 }}

      >

        <h1 className="text-4xl font-bold text-gray-800 flex items-center gap-3">
          <CalendarClock className="text-blue-600" />
          My Timetable
        </h1>

        <p className="text-gray-500 mt-2">
          Your weekly class schedule based on enrolled courses.
        </p>

      </motion.div>

      {

        entries.length === 0 ? (

          <div className="bg-white rounded-3xl shadow-lg p-20 text-center">

            <CalendarClock
              size={70}
              className="mx-auto text-gray-300"
            />

            <h2 className="text-2xl font-bold mt-6">
              No Timetable Entries Yet
            </h2>

            <p className="text-gray-500 mt-2">
              Your schedule will appear here once it is set up.
            </p>

          </div>

        ) : (

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

            {

              groupedByDay
                .filter((group) => group.items.length > 0)
                .map((group) => (

                  <motion.div

                    key={group.day}

                    initial={{ opacity: 0, y: 20 }}

                    animate={{ opacity: 1, y: 0 }}

                    className="bg-white rounded-3xl shadow-xl p-6"

                  >

                    <h2 className="text-xl font-bold mb-5 text-blue-700">
                      {group.day}
                    </h2>

                    <div className="space-y-4">

                      {

                        group.items.map((item) => (

                          <div
                            key={item.id}
                            className="bg-gray-50 rounded-2xl p-4"
                          >

                            <h3 className="font-bold text-gray-800">
                              {item.course_name}
                            </h3>

                            <p className="text-sm text-gray-500">
                              {item.course_code}
                            </p>

                            <div className="flex items-center gap-2 text-gray-600 mt-3 text-sm">
                              <Clock3 size={16} />
                              {formatTime(item.start_time)} - {formatTime(item.end_time)}
                            </div>

                            <div className="flex items-center gap-2 text-gray-600 mt-2 text-sm">
                              <MapPin size={16} />
                              {item.room}
                            </div>

                            <div className="flex items-center gap-2 text-gray-600 mt-2 text-sm">
                              <User size={16} />
                              {item.teachers && item.teachers.length > 0
                                ? item.teachers.join(", ")
                                : "Not Assigned"}
                            </div>

                          </div>

                        ))

                      }

                    </div>

                  </motion.div>

                ))

            }

          </div>

        )

      }

    </div>

  );

}

export default StudentTimetable;