import { motion } from "framer-motion";
import { Eye, GraduationCap } from "lucide-react";

function StudentTable({ students, onView }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8"
    >
      <div className="flex items-center gap-3 p-6 border-b">
        <GraduationCap className="text-purple-600" />
        <h2 className="text-2xl font-bold text-gray-800">
          Student Reports
        </h2>
      </div>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="text-left p-4">
                Student
              </th>

              <th className="text-left p-4">
                Department
              </th>

              <th className="text-center p-4">
                Semester
              </th>

              <th className="text-center p-4">
                Courses
              </th>

              <th className="text-center p-4">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {students.map((student) => (

              <tr
                key={student.id}
                className="border-b hover:bg-gray-50 transition"
              >

                <td className="p-4 font-semibold">
                  {student.student}
                </td>

                <td className="p-4">
                  {student.department}
                </td>

                <td className="p-4 text-center">
                  {student.semester}
                </td>

                <td className="p-4 text-center">
                  {student.courses_count}
                </td>

                <td className="p-4 text-center">

                  <button
                    onClick={() => onView(student.id, "student")}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 mx-auto"
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

export default StudentTable;