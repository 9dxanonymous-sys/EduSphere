import { useEffect, useState } from "react";
import { getTeacherCourses } from "../../services/teacherService";

function TeacherCoursesModal({ teacher, onClose }) {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      const data = await getTeacherCourses(teacher.id);

      // Backend return:
      // {
      //   teacher: "...",
      //   courses: [...]
      // }

      setCourses(data.courses || []);
    } catch (err) {
      console.log(err);
      alert("Failed to load teacher courses");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">

      <div className="bg-white rounded-xl p-6 w-[500px]">

        <h2 className="text-2xl font-bold mb-5">
          {teacher.full_name}'s Courses
        </h2>

        {loading ? (

          <p>Loading...</p>

        ) : courses.length === 0 ? (

          <p className="text-gray-500">
            No Courses Assigned
          </p>

        ) : (

          <div className="space-y-3">

            {courses.map((course) => (

              <div
                key={course.id}
                className="border rounded-lg p-4 bg-gray-50"
              >
                <h3 className="font-semibold">
                  {course.course_name}
                </h3>

                <p className="text-sm text-gray-600">
                  {course.course_code}
                </p>

                <p className="text-sm">
                  Credit Hours: {course.credit_hours}
                </p>
              </div>

            ))}

          </div>

        )}

        <div className="flex justify-end mt-6">

          <button
            onClick={onClose}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded"
          >
            Close
          </button>

        </div>

      </div>

    </div>
  );
}

export default TeacherCoursesModal;