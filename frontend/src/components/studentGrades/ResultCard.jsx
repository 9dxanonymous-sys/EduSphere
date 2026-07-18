function ResultCard({ result }) {

  return (

    <div className="bg-white rounded-2xl shadow p-5">

      <div className="flex justify-between">

        <div>

          <h2 className="text-xl font-bold">
            Grade: {result.grade}
          </h2>

          <p className="text-gray-500 mt-1">
            Total : {result.total_marks}
          </p>

        </div>

        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center text-white text-xl font-bold">
          {result.grade}
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