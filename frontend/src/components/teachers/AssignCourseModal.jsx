import { useEffect, useState } from "react";
import { getCourses } from "../../services/courseService";
import { assignCourse } from "../../services/teacherService";

function AssignCourseModal({ teacher, onClose }) {
  const [courses, setCourses] = useState([]);
  const [courseId, setCourseId] = useState("");

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      const data = await getCourses();
      setCourses(data);
    } catch (err) {
      console.log(err);
      alert("Failed to load courses");
    }
  };

  const handleAssign = async () => {
    if (!courseId) {
      alert("Please select a course");
      return;
    }

    try {
      await assignCourse(teacher.id, courseId);

      alert("Course Assigned Successfully");

      onClose();
    } catch (err) {
      console.log(err);
      alert("Assignment Failed");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">

      <div className="bg-white rounded-xl p-6 w-[450px]">

        <h2 className="text-2xl font-bold mb-5">
          Assign Course
        </h2>

        <p className="mb-4">
          Teacher:
          <b> {teacher.full_name}</b>
        </p>

        <select
          value={courseId}
          onChange={(e) => setCourseId(e.target.value)}
          className="w-full border p-3 rounded mb-6"
        >

          <option value="">
            Select Course
          </option>

          {courses.map((course) => (

            <option
              key={course.id}
              value={course.id}
            >
              {course.course_code} - {course.course_name}
            </option>

          ))}

        </select>

        <div className="flex justify-end gap-3">

          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>

          <button
            onClick={handleAssign}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Assign
          </button>

        </div>

      </div>

    </div>
  );
}

export default AssignCourseModal;