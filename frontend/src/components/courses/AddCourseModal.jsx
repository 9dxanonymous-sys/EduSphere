import { useState } from "react";
import { addCourse } from "../../services/courseService";

function AddCourseModal({ onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    course_code: "",
    course_name: "",
    credit_hours: "",
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
      await addCourse(formData);

      alert("Course Added Successfully");

      onSuccess();
      onClose();
    } catch (err) {
      console.log(err);
      alert("Failed To Add Course");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">

      <div className="bg-white p-6 rounded-xl w-[450px]">

        <h2 className="text-2xl font-bold mb-5">
          Add Course
        </h2>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="course_code"
            placeholder="Course Code"
            className="w-full border p-3 rounded mb-3"
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="course_name"
            placeholder="Course Name"
            className="w-full border p-3 rounded mb-3"
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="credit_hours"
            placeholder="Credit Hours"
            className="w-full border p-3 rounded mb-5"
            onChange={handleChange}
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
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              Add Course
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default AddCourseModal;