import { useState } from "react";
import { updateCourse } from "../../services/courseService";

function EditCourseModal({ course, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    course_code: course.course_code,
    course_name: course.course_name,
    credit_hours: course.credit_hours,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.name === "credit_hours"
          ? Number(e.target.value)
          : e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateCourse(course.id, formData);

      alert("Course Updated Successfully");

      onSuccess();
      onClose();
    } catch (err) {
      console.log(err);
      alert("Failed To Update Course");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">

      <div className="bg-white p-6 rounded-xl w-[450px]">

        <h2 className="text-2xl font-bold mb-5">
          Edit Course
        </h2>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="course_code"
            value={formData.course_code}
            onChange={handleChange}
            className="w-full border p-3 rounded mb-3"
            required
          />

          <input
            type="text"
            name="course_name"
            value={formData.course_name}
            onChange={handleChange}
            className="w-full border p-3 rounded mb-3"
            required
          />

          <input
            type="number"
            name="credit_hours"
            value={formData.credit_hours}
            onChange={handleChange}
            className="w-full border p-3 rounded mb-5"
            required
          />

          <div className="flex justify-end gap-3">

            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
            >
              Update Course
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default EditCourseModal;