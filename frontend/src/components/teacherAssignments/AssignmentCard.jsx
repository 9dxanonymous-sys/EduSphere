import { useState } from "react";
import { CalendarDays, FileText, Pencil, Trash2 } from "lucide-react";

import EditAssignmentModal from "./EditAssignmentModal";
import DeleteAssignmentModal from "./DeleteAssignmentModal";

function AssignmentCard({ assignment, refresh }) {

  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">

        <div className="flex justify-between items-start">

          <div>

            <h2 className="text-2xl font-bold text-gray-800">
              {assignment.title}
            </h2>

            <div className="flex items-center gap-2 text-gray-500 mt-2">
              <CalendarDays size={18} />
              <span>
                Due:
                {" "}
                {assignment.due_date}
              </span>
            </div>

          </div>

          <FileText
            size={34}
            className="text-blue-600"
          />

        </div>

        <p className="mt-5 text-gray-600 whitespace-pre-line">
          {assignment.description}
        </p>

        <div className="flex justify-end gap-3 mt-6">

          <button
            onClick={() => setShowEdit(true)}
            className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"
          >
            <Pencil size={18} />
            Edit
          </button>

          <button
            onClick={() => setShowDelete(true)}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
          >
            <Trash2 size={18} />
            Delete
          </button>

        </div>

      </div>

      {showEdit && (
        <EditAssignmentModal
          assignment={assignment}
          onClose={() => setShowEdit(false)}
          onSuccess={() => {
            refresh();
            setShowEdit(false);
          }}
        />
      )}

      {showDelete && (
        <DeleteAssignmentModal
          assignment={assignment}
          onClose={() => setShowDelete(false)}
          onSuccess={() => {
            refresh();
            setShowDelete(false);
          }}
        />
      )}
    </>
  );
}

export default AssignmentCard;