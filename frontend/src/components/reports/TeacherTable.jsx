import { motion } from "framer-motion";
import { Eye, Users } from "lucide-react";

function TeacherTable({ teachers, onView }) {

  return (

    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8"
    >

      <div className="flex items-center gap-3 p-6 border-b">

        <Users className="text-green-600" />

        <h2 className="text-2xl font-bold text-gray-800">

          Teacher Reports

        </h2>

      </div>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="text-left p-4">
                Teacher
              </th>

              <th className="text-left p-4">
                Department
              </th>

              <th className="text-center p-4">
                Courses
              </th>

              <th className="text-center p-4">
                Students
              </th>

              <th className="text-center p-4">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {teachers.map((teacher) => (

              <tr
                key={teacher.id}
                className="border-b hover:bg-gray-50 transition"
              >

                <td className="p-4 font-semibold">

                  {teacher.teacher}

                </td>

                <td className="p-4">

                  {teacher.department}

                </td>

                <td className="p-4 text-center">

                  {teacher.courses_count}

                </td>

                <td className="p-4 text-center">

                  {teacher.students_count}

                </td>

                <td className="p-4 text-center">

                  <button
                    onClick={() => onView(teacher.id, "teacher")}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 mx-auto"
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

export default TeacherTable;