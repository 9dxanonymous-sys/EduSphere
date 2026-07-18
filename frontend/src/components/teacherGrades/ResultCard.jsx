import { Pencil, Trash2 } from "lucide-react";

function ResultCard({
  result,
  onEdit,
  onDelete,
}) {

  return (

    <div className="bg-white rounded-2xl shadow p-5">

      <div className="flex justify-between">

        <div>

          <h2 className="text-xl font-bold">
            {result.student?.full_name || `Student ${result.student_id}`}
          </h2>

          <p className="text-gray-500 mt-1">
            Grade : {result.grade}
          </p>

          <p className="text-gray-500">
            Total : {result.total_marks}
          </p>

        </div>

        <div className="flex gap-2">

          <button
            onClick={() => onEdit(result)}
            className="bg-blue-600 text-white p-2 rounded-lg"
          >
            <Pencil size={18} />
          </button>

          <button
            onClick={() => onDelete(result)}
            className="bg-red-600 text-white p-2 rounded-lg"
          >
            <Trash2 size={18} />
          </button>

        </div>

      </div>

      <div className="grid grid-cols-2 gap-3 mt-5">

        <div>
          Assignment :
          <span className="font-semibold ml-2">
            {result.assignment_marks}
          </span>
        </div>

        <div>
          Attendance :
          <span className="font-semibold ml-2">
            {result.attendance_marks}
          </span>
        </div>

        <div>
          Mid :
          <span className="font-semibold ml-2">
            {result.mid_marks}
          </span>
        </div>

        <div>
          Final :
          <span className="font-semibold ml-2">
            {result.final_marks}
          </span>
        </div>

      </div>

    </div>

  );

}

export default ResultCard;