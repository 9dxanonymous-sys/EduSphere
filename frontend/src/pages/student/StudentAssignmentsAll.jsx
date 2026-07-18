import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ClipboardList } from "lucide-react";

import { getMyEnrolledCourses } from "../../services/studentService";
import { getMyCourseAssignments } from "../../services/assignmentService";

function StudentAssignmentsAll() {

  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAssignments();
  }, []);

  const loadAssignments = async () => {

    try {

      const data = await getMyEnrolledCourses();
      const courses = data.courses || [];

      const results = await Promise.all(
        courses.map((course) =>
          getMyCourseAssignments(course.id)
            .then((items) =>
              (items || []).map((item) => ({
                ...item,
                course_name: course.course_name,
              }))
            )
            .catch(() => [])
        )
      );

      setAssignments(results.flat());

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
          Loading Assignments...
        </h2>
      </div>
    );

  }

  return (

    <div className="space-y-8">

      <div className="bg-gradient-to-r from-blue-700 via-indigo-600 to-cyan-500 rounded-3xl shadow-xl p-8 text-white">

        <div className="flex items-center gap-4">

          <div className="bg-white/20 p-4 rounded-2xl">
            <ClipboardList size={38} />
          </div>

          <div>
            <h1 className="text-3xl font-bold">
              My Assignments
            </h1>
            <p className="text-blue-100 mt-2">
              Assignments across all your enrolled courses.
            </p>
          </div>

        </div>

      </div>

      {

        assignments.length === 0 ? (

          <div className="bg-white rounded-3xl shadow-xl p-10 text-center text-gray-500">
            No assignments found.
          </div>

        ) : (

          <div className="grid md:grid-cols-2 gap-6">

            {

              assignments.map((item) => (

                <motion.div

                  key={item.id}

                  whileHover={{ y: -3 }}

                  className="bg-white rounded-3xl shadow-xl p-6"

                >

                  <div className="flex justify-between items-start mb-3">

                    <h3 className="font-bold text-lg">
                      {item.title}
                    </h3>

                    <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                      {item.course_name}
                    </span>

                  </div>

                  <p className="text-gray-600 text-sm">
                    {item.description}
                  </p>

                  <p className="text-gray-400 text-xs mt-3">
                    Due: {item.due_date}
                  </p>

                </motion.div>

              ))

            }

          </div>

        )

      }

    </div>

  );

}

export default StudentAssignmentsAll;