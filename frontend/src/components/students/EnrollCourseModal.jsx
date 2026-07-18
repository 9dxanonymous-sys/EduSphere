import { useEffect, useState } from "react";
import { getCourses } from "../../services/courseService";
import { enrollStudent } from "../../services/studentService";

function EnrollCourseModal({ student, onClose }) {
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

  const handleEnroll = async () => {
    if (!courseId) {
      alert("Please select a course");
      return;
    }

    try {
      await enrollStudent(student.id, courseId);

      alert("Student Enrolled Successfully");

      onClose();
    } catch (err) {
      console.log(err);
      alert("Enrollment Failed");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">

      <div className="bg-white rounded-xl p-6 w-[450px]">

        <h2 className="text-2xl font-bold mb-5">
          Enroll Student
        </h2>

        <p className="mb-4">
          Student:
          <b> {student.full_name}</b>
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
            onClick={handleEnroll}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Enroll
          </button>

        </div>

      </div>

    </div>
  );
}

export default EnrollCourseModal;