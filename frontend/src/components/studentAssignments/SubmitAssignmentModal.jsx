import { useState } from "react";
import { X } from "lucide-react";

import { submitAssignment } from "../../services/assignmentService";

function SubmitAssignmentModal({ assignment, onClose, onSuccess }) {

  const [submissionText, setSubmissionText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const res = await submitAssignment({
        assignment_id: assignment.id,
        submission_text: submissionText,
      });

      if (res.error) {
        alert(res.error);
        return;
      }

      alert("Assignment Submitted Successfully");
      onSuccess();

    } catch (error) {

      console.log(error);
      alert("Failed to submit assignment");

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

      <div className="bg-white rounded-3xl w-full max-w-xl p-8 relative shadow-2xl">

        <button
          onClick={onClose}
          className="absolute right-5 top-5"
        >
          <X />
        </button>

        <h2 className="text-2xl font-bold mb-2">
          Submit Assignment
        </h2>

        <p className="text-gray-500 mb-6">
          {assignment.title}
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>

            <label className="block mb-2 font-medium">
              Your Submission
            </label>

            <textarea
              value={submissionText}
              onChange={(e) => setSubmissionText(e.target.value)}
              rows={8}
              className="w-full border rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Write your answer or paste your submission text here..."
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
              {loading ? "Submitting..." : "Submit"}
            </button>

          </div>

        </form>

      </div>

    </div>

  );

}

export default SubmitAssignmentModal;