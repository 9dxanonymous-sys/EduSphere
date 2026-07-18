import { motion } from "framer-motion";
import { Eye, BookOpen } from "lucide-react";

function CourseTable({ courses, onView }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8"
    >
      <div className="flex items-center gap-3 p-6 border-b">
        <BookOpen className="text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-800">
          Course Reports
        </h2>
      </div>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="text-left p-4">Course Name</th>
              <th className="text-left p-4">Teacher</th>
              <th className="text-center p-4">Students</th>
              <th className="text-center p-4">Action</th>

            </tr>

          </thead>

          <tbody>

            {courses.map((course) => (

              <tr
                key={course.id}
                className="border-b hover:bg-gray-50 transition"
              >

                <td className="p-4 font-semibold">
                  {course.course_name}
                </td>

                <td className="p-4">
                  {course.teacher}
                </td>

                <td className="p-4 text-center">
                  {course.students_count}
                </td>

                <td className="p-4 text-center">

                  <button
                    onClick={() => onView(course.id, "course")}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 mx-auto"
                  >
                    <Eye size={18} />
                    View
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </motion.div>
  );
}

export default CourseTable;