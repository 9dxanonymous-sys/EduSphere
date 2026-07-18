import { motion } from "framer-motion";
import { GraduationCap, Plus } from "lucide-react";

function StudentHeader({ onAdd }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -25 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8"
    >
      <div className="bg-gradient-to-r from-indigo-700 via-blue-600 to-cyan-500 rounded-3xl shadow-xl p-8 text-white">

        <div className="flex flex-col lg:flex-row justify-between items-center">

          <div>

            <div className="flex items-center gap-4">

              <div className="bg-white/20 p-4 rounded-2xl">

                <GraduationCap size={34} />

              </div>

              <div>

                <h1 className="text-4xl font-bold">
                  Students Management
                </h1>

                <p className="mt-2 text-blue-100">
                  Manage students, enrollments and academic information.
                </p>

              </div>

            </div>

          </div>

          <button
            onClick={onAdd}
            className="mt-6 lg:mt-0 flex items-center gap-2 bg-white text-blue-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition shadow"
          >
            <Plus size={20} />
            Add Student
          </button>

        </div>

      </div>
    </motion.div>
  );
}

export default StudentHeader;