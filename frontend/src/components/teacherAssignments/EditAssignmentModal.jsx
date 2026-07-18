import { useState } from "react";
import { updateAssignment } from "../../services/assignmentService";

function EditAssignmentModal({
  assignment,
  onClose,
  onSuccess,
}) {

  const [formData, setFormData] = useState({
    title: assignment.title || "",
    description: assignment.description || "",
    due_date: assignment.due_date || "",
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

    console.log("Assignment Object:", assignment);

    try {

      const payload = {
        title: formData.title,
        description: formData.description,
        due_date: formData.due_date,
        course_id: assignment.course_id,
      };

      console.log("Payload:", payload);

      await updateAssignment(
        assignment.id,
        payload
      );

      alert("Assignment Updated Successfully");

      onSuccess();

      onClose();

    } catch (error) {

      console.log(error);

      console.log(error.response?.data);

      alert("Failed To Update Assignment");

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

      <div className="bg-white rounded-2xl p-8 w-[600px]">

        <h2 className="text-2xl font-bold mb-6">
          Edit Assignment
        </h2>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 mb-4"
            required
          />

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={6}
            className="w-full border rounded-lg p-3 mb-4"
            required
          />

          <input
            type="date"
            name="due_date"
            value={formData.due_date}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 mb-6"
            required
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
              className="px-5 py-2 rounded-lg bg-blue-600 text-white"
            >
              {loading ? "Updating..." : "Update Assignment"}
            </button>

          </div>

        </form>

      </div>

    </div>

  );

}

export default EditAssignmentModal;