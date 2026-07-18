import { useState } from "react";
import { addTeacher } from "../../services/teacherService";

function AddTeacherModal({ onClose, onSuccess }) {
  const initialFormState = {
    full_name: "",
    email: "",
    password: "",
    department: "",
  };

  const [formData, setFormData] = useState(initialFormState);
  // Form submit hote waqt double-click/spam rokne ke liye
  const [loading, setLoading] = useState(false); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addTeacher(formData);
      alert("Teacher account created successfully.");
      setFormData(initialFormState); // Success par form reset karne ke liye
      onSuccess();
      onClose();
    } catch (err) {
      console.error("Error adding teacher:", err);
      alert(err?.response?.data?.message || "Failed To Add Teacher");
    } finally {
      setLoading(false);
    }
  };

  // Input fields ki styling ko uniform karne ke liye common class
  const inputStyle = "w-full border p-3 rounded mb-3 focus:outline-none focus:border-blue-500 transition-colors";

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 ready-fade-in">
      <div className="bg-white p-6 rounded-xl w-[450px] shadow-lg">
        <h2 className="text-2xl font-bold mb-5 text-gray-800">Add Teacher</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="full_name"
            placeholder="Full Name"
            className={inputStyle}
            value={formData.full_name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            className={inputStyle}
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Temporary Password"
            className={inputStyle}
            value={formData.password}
            onChange={handleChange}
            required
          />

          {/* Department field ke bad zyada margin (mb-5) filter layout ke liye */}
          <input
            type="text"
            name="department"
            placeholder="Department"
            className="w-full border p-3 rounded mb-5 focus:outline-none focus:border-blue-500 transition-colors"
            value={formData.department}
            onChange={handleChange}
            required
          />

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Adding..." : "Add Teacher"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddTeacherModal;