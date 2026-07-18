import { deleteAssignment } from "../../services/assignmentService";

function DeleteAssignmentModal({
  assignment,
  onClose,
  onSuccess,
}) {

  const handleDelete = async () => {

    try {

      await deleteAssignment(assignment.id);

      alert("Assignment Deleted Successfully");

      onSuccess();

      onClose();

    } catch (error) {

      console.log(error);

      alert("Failed To Delete Assignment");

    }

  };

  return (

    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

      <div className="bg-white rounded-2xl p-8 w-[450px]">

        <h2 className="text-2xl font-bold text-red-600 mb-4">
          Delete Assignment
        </h2>

        <p className="text-gray-600 mb-8">
          Are you sure you want to delete
          <span className="font-bold">
            {" "}
            "{assignment.title}"
          </span>
          ?
        </p>

        <div className="flex justify-end gap-3">

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-gray-500 text-white hover:bg-gray-600"
          >
            Cancel
          </button>

          <button
            onClick={handleDelete}
            className="px-5 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
          >
            Delete
          </button>

        </div>

      </div>

    </div>

  );

}

export default DeleteAssignmentModal;