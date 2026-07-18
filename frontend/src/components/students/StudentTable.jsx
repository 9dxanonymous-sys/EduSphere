import { motion } from "framer-motion";
import {
  Pencil,
  Trash2,
  BookOpen,
  UserPlus,
  GraduationCap,
} from "lucide-react";

function StudentTable({
  students,
  onEdit,
  onDelete,
  onEnroll,
  onViewCourses,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-3xl shadow-xl overflow-hidden"
    >
      {/* Header */}

      <div className="px-6 py-5 border-b bg-gradient-to-r from-slate-50 to-blue-50">

        <div className="flex justify-between items-center">

          <div>

            <h2 className="text-2xl font-bold text-gray-800">
              Students List
            </h2>

            <p className="text-gray-500 mt-1">
              Total Students : {students.length}
            </p>

          </div>

        </div>

      </div>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr className="text-gray-700">

              <th className="px-6 py-4 text-left">ID</th>

              <th className="px-6 py-4 text-left">
                Student
              </th>

              <th className="px-6 py-4 text-left">
                Email
              </th>

              <th className="px-6 py-4 text-center">
                Department
              </th>

              <th className="px-6 py-4 text-center">
                Semester
              </th>

              <th className="px-6 py-4 text-center">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {students.length === 0 ? (

              <tr>

                <td
                  colSpan={6}
                  className="text-center py-12 text-gray-500"
                >
                  No Students Found
                </td>

              </tr>

            ) : (

              students.map((student, index) => (

                <motion.tr
                  key={student.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.03 }}
                  className="border-b hover:bg-blue-50 transition-all"
                >

                  <td className="px-6 py-5 font-semibold">
                    #{student.id}
                  </td>

                  <td className="px-6 py-5">

                    <div className="flex items-center gap-3">

                      <div className="w-11 h-11 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center text-white font-bold">

                        {student.full_name.charAt(0).toUpperCase()}

                      </div>

                      <div>

                        <p className="font-semibold">
                          {student.full_name}
                        </p>

                        <p className="text-xs text-gray-500">
                          Student
                        </p>

                      </div>

                    </div>

                  </td>

                  <td className="px-6 py-5 text-gray-600">
                    {student.email}
                  </td>

                  <td className="px-6 py-5 text-center">

                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">

                      {student.department}

                    </span>

                  </td>

                  <td className="px-6 py-5 text-center">

                    <span className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold">

                      <GraduationCap size={16} />

                      {student.semester}

                    </span>

                  </td>

                  <td className="px-6 py-5">

                    <div className="flex justify-center gap-2 flex-wrap">

                      <button
                        onClick={() => onEdit(student)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-lg transition"
                        title="Edit Student"
                      >
                        <Pencil size={18} />
                      </button>

                      <button
                        onClick={() => onDelete(student)}
                        className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg transition"
                        title="Delete Student"
                      >
                        <Trash2 size={18} />
                      </button>

                      <button
                        onClick={() => onEnroll(student)}
                        className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-lg transition"
                        title="Enroll Course"
                      >
                        <UserPlus size={18} />
                      </button>

                      <button
                        onClick={() => onViewCourses(student)}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-lg transition"
                        title="View Courses"
                      >
                        <BookOpen size={18} />
                      </button>

                    </div>

                  </td>

                </motion.tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </motion.div>
  );
}

export default StudentTable;