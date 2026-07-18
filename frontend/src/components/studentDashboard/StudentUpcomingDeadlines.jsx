import { motion } from "framer-motion";
import { Clock3 } from "lucide-react";

function StudentUpcomingDeadlines() {

  // Dummy data for now.
  // Later you can fetch it from the backend.

  const deadlines = [
    "Assignment 01 - Due Tomorrow",
    "Quiz - Friday",
    "Lab Report - 2 Days Left",
    "Project Submission - Next Week",
  ];

  return (

    <motion.div
      whileHover={{ y: -4 }}
      className="bg-white rounded-3xl shadow-xl p-6"
    >

      <div className="flex items-center gap-3 mb-6">

        <div className="bg-red-100 p-3 rounded-2xl">
          <Clock3 className="text-red-600" />
        </div>

        <h2 className="text-2xl font-bold">
          Upcoming Deadlines
        </h2>

      </div>

      <div className="space-y-4">

        {deadlines.map((deadline, index) => (

          <div
            key={index}
            className="border border-gray-200 rounded-2xl p-4 hover:shadow-md transition"
          >

            <p className="text-gray-700 font-medium">
              {deadline}
            </p>

          </div>

        ))}

      </div>

    </motion.div>

  );

}

export default StudentUpcomingDeadlines;