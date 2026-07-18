import { useState } from "react";
import { updateTeacher } from "../../services/teacherService";

function EditTeacherModal({ teacher, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    full_name: teacher.full_name,
    email: teacher.email,
    department: teacher.department,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.name === "semester"
          ? Number(e.target.value)
          : e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateTeacher(teacher.id, formData);

      alert("Teacher Updated Successfully");

      onSuccess();
      onClose();
    } catch (err) {
      console.log(err);
      alert("Failed To Update Teacher");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl w-[450px]">

        <h2 className="text-2xl font-bold mb-5">
          Edit Teacher
        </h2>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            className="w-full border p-3 rounded mb-3"
            required
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-3 rounded mb-3"
            required
          />

          <input
            type="text"
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="w-full border p-3 rounded mb-3"
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
              Update Teacher
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}

export default EditTeacherModal;