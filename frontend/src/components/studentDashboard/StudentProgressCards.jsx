import { motion } from "framer-motion";
import {
  CircularProgressbar,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function StudentProgressCards({ stats }) {
  const data = [
    {
      title: "Attendance",
      value: stats.attendance_percentage,
      max: 100,
      color: "#16a34a",
      display: `${stats.attendance_percentage}%`,
    },
    {
      title: "CGPA",
      value: stats.cgpa,
      max: 4,
      color: "#2563eb",
      display: `${stats.cgpa}`,
    },
    {
      title: "Courses",
      value: stats.total_courses,
      max: 8,
      color: "#ea580c",
      display: `${stats.total_courses}`,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-3xl shadow-xl p-6"
    >
      <h2 className="text-2xl font-bold mb-8">
        Academic Progress
      </h2>

      {/* Progress Circles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {data.map((item) => (
          <div
            key={item.title}
            className="flex flex-col items-center"
          >
            <div className="w-32 h-32">
              <CircularProgressbar
                value={(item.value / item.max) * 100}
                text={item.display}
                styles={buildStyles({
                  textSize: "16px",
                  pathColor: item.color,
                  textColor: "#111827",
                  trailColor: "#E5E7EB",
                })}
              />
            </div>

            <h3 className="mt-5 font-semibold text-lg">
              {item.title}
            </h3>

            <p className="text-gray-500">
              {item.display} / {item.max}
            </p>
          </div>
        ))}
      </div>

      {/* Academic Insights */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-green-50 rounded-2xl p-4">
          <p className="text-sm text-gray-500">
            Attendance Status
          </p>

          <h3 className="text-lg font-bold text-green-700 mt-1">
            {stats.attendance_percentage >= 75
              ? "Excellent"
              : "Needs Improvement"}
          </h3>
        </div>

        <div className="bg-blue-50 rounded-2xl p-4">
          <p className="text-sm text-gray-500">
            Academic Standing
          </p>

          <h3 className="text-lg font-bold text-blue-700 mt-1">
            {stats.cgpa >= 3
              ? "Good Progress"
              : "Keep Working"}
          </h3>
        </div>

        <div className="bg-orange-50 rounded-2xl p-4">
          <p className="text-sm text-gray-500">
            Active Courses
          </p>

          <h3 className="text-lg font-bold text-orange-700 mt-1">
            {stats.total_courses} Enrolled
          </h3>
        </div>
      </div>

      {/* Academic Summary */}
      <div className="mt-6 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-2xl p-5">
        <h3 className="font-bold text-lg mb-2">
          Academic Summary
        </h3>

        <p className="text-gray-600 text-sm leading-6">
          You're currently enrolled in {stats.total_courses} course
          {stats.total_courses !== 1 ? "s" : ""} with a CGPA of{" "}
          {stats.cgpa} and an attendance percentage of{" "}
          {stats.attendance_percentage}%. Keep maintaining your
          academic performance throughout the semester.
        </p>
      </div>
    </motion.div>
  );
}

export default StudentProgressCards;