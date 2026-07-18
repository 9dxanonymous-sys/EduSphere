import { useState } from "react";

import { createAssignment } from "../../services/assignmentService";

function AddAssignmentModal({
  courseId,
  onClose,
  onSuccess,
}) {

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    due_date: "",
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

    setLoading(true);

    try {

      await createAssignment({

        ...formData,

        course_id: Number(courseId),

      });

      alert("Assignment Created Successfully");

      onSuccess();

      onClose();

    } catch (error) {

      console.log(error);

      alert("Failed to Create Assignment");

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

      <div className="bg-white rounded-2xl w-[600px] p-8">

        <h2 className="text-2xl font-bold mb-6">
          Create Assignment
        </h2>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="title"
            placeholder="Assignment Title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-3 mb-4"
          />

          <textarea
            name="description"
            placeholder="Assignment Description"
            rows={6}
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-3 mb-4"
          />

          <input
            type="date"
            name="due_date"
            value={formData.due_date}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-3 mb-6"
          />

          <div className="flex justify-end gap-3">

            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-lg bg-gray-500 text-white"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
            >
              {loading ? "Creating..." : "Create Assignment"}
            </button>

          </div>

        </form>

      </div>

    </div>

  );

}

export default AddAssignmentModal;