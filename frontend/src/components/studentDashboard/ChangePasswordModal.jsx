import { useState } from "react";
import { X } from "lucide-react";

import { changeMyPassword } from "../../services/studentService";

function ChangePasswordModal({ onClose, onSuccess }) {

  const [formData, setFormData] = useState({
    current_password: "",
    new_password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const res = await changeMyPassword(formData);

      if (res.error) {
        alert(res.error);
        return;
      }

      alert("Password Changed Successfully");
      onSuccess();

    } catch (error) {

      console.log(error);
      alert("Failed to change password");

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

      <div className="bg-white rounded-3xl w-full max-w-md p-8 relative shadow-2xl">

        <button
          onClick={onClose}
          className="absolute right-5 top-5"
        >
          <X />
        </button>

        <h2 className="text-2xl font-bold mb-8">
          Change Password
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>

            <label className="block mb-2 font-medium">
              Current Password
            </label>

            <input
              type="password"
              name="current_password"
              value={formData.current_password}
              onChange={handleChange}
              className="w-full border rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

          </div>

          <div>

            <label className="block mb-2 font-medium">
              New Password
            </label>

            <input
              type="password"
              name="new_password"
              value={formData.new_password}
              onChange={handleChange}
              className="w-full border rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

          </div>

          <div className="flex justify-end gap-4 pt-4">

            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 rounded-2xl border hover:bg-gray-100 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-6 py-3 rounded-2xl hover:shadow-xl transition disabled:opacity-50"
            >
              {loading ? "Saving..." : "Change Password"}
            </button>

          </div>

        </form>

      </div>

    </div>

  );

}

export default ChangePasswordModal;