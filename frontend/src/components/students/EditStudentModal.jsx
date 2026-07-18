import { useState, useEffect } from "react";
import { updateStudent } from "../../services/studentService";

function EditStudentModal({ student, onClose, onSuccess }) {
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    department: "",
    semester: "",
  });

  useEffect(() => {
    if (student) {
      setForm(student);
    }
  }, [student]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateStudent(student.id, {
        ...form,
        semester: Number(form.semester),
      });

      alert("Student Updated Successfully");

      onSuccess();
      onClose();
    } catch (err) {
      console.log(err);
      alert("Update Failed");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
      <div className="bg-white w-[500px] rounded-xl p-6">

        <h2 className="text-2xl font-bold mb-5">
          Edit Student
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            name="full_name"
            value={form.full_name}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <input
            name="department"
            value={form.department}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <input
            name="semester"
            type="number"
            value={form.semester}
            onChange={handleChange}
            className="w-full border p-3 rounded"
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
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              Update
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}

export default EditStudentModal;