import { Search, RotateCcw, Filter } from "lucide-react";

function StudentToolbar({
  search,
  setSearch,
  department,
  setDepartment,
  semester,
  setSemester,
  departments,
  onRefresh,
}) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-5 mb-8">

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">

        {/* Search */}

        <div className="relative">

          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search student..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border rounded-xl pl-11 pr-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
          />

        </div>

        {/* Department */}

        <select
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          className="border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
        >
          <option value="">All Departments</option>

          {departments.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}

        </select>

        {/* Semester */}

        <select
          value={semester}
          onChange={(e) => setSemester(e.target.value)}
          className="border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
        >
          <option value="">All Semesters</option>

          {[1,2,3,4,5,6,7,8].map((sem)=>(
            <option key={sem} value={sem}>
              Semester {sem}
            </option>
          ))}

        </select>

        {/* Buttons */}

        <div className="flex gap-3">

          <button
            onClick={onRefresh}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-xl flex justify-center items-center gap-2"
          >
            <RotateCcw size={18}/>
            Refresh
          </button>

          <button
            className="px-5 bg-gray-100 rounded-xl hover:bg-gray-200"
          >
            <Filter size={20}/>
          </button>

        </div>

      </div>

    </div>
  );
}

export default StudentToolbar;