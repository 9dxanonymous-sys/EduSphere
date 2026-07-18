import { deleteTeacher } from "../../services/teacherService";

function DeleteTeacherModal({ teacher, onClose, onSuccess }) {

  const handleDelete = async () => {
    try {

      await deleteTeacher(teacher.id);

      alert("Teacher Deleted Successfully");

      onSuccess();
      onClose();

    } catch (err) {

      console.log(err);

      alert("Failed To Delete Teacher");

    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">

      <div className="bg-white p-6 rounded-xl w-[400px]">

        <h2 className="text-2xl font-bold">
          Delete Teacher
        </h2>

        <p className="mt-4">
          Are you sure you want to delete
          <b> {teacher.full_name}</b>?
        </p>

        <div className="flex justify-end gap-3 mt-6">

          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>

          <button
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
          >
            Delete
          </button>

        </div>

      </div>

    </div>
  );
}

export default DeleteTeacherModal;