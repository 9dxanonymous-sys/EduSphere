import { useState } from "react";
import { addStudent } from "../../services/studentService";

function AddStudentModal({ onClose, onSuccess }) {
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    password: "",
    semester: "",
    department: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await addStudent({
        ...form,
        semester: Number(form.semester),
      });

      alert("Student Added Successfully");

      onSuccess();
      onClose();

    } catch (error) {
      console.log(error);
      alert("Failed to Add Student");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">

      <div className="bg-white w-[500px] rounded-xl p-6">

        <h2 className="text-2xl font-bold mb-5">
          Add Student
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            name="full_name"
            placeholder="Full Name"
            className="w-full border p-3 rounded"
            onChange={handleChange}
            required
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            className="w-full border p-3 rounded"
            onChange={handleChange}
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Temporary Password"
            className="w-full border p-3 rounded"
            onChange={handleChange}
            required
          />

          <input
            name="department"
            placeholder="Department"
            className="w-full border p-3 rounded"
            onChange={handleChange}
            required
          />

          <input
            name="semester"
            type="number"
            placeholder="Semester"
            className="w-full border p-3 rounded"
            onChange={handleChange}
            required
          />

          <div className="flex justify-end gap-3">

            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2 bg-gray-400 text-white rounded disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
            >
              {loading ? "Adding..." : "Save"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default AddStudentModal;