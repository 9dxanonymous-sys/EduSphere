import { Search, RotateCcw, Filter } from "lucide-react";


function TeacherToolbar({
  search,
  setSearch,
  department,
  setDepartment,
  departments,
  onRefresh
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

placeholder="Search teacher..."

value={search}

onChange={(e)=>setSearch(e.target.value)}

className="w-full border rounded-xl py-3 pl-11 pr-4 outline-none focus:ring-2 focus:ring-blue-500"

/>

</div>



{/* Department Filter */}

<select

value={department}

onChange={(e)=>setDepartment(e.target.value)}

className="border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"

>

<option value="">
All Departments
</option>


{
departments.map((dept)=>(

<option key={dept} value={dept}>
{dept}
</option>

))
}


</select>




<button

onClick={onRefresh}

className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl flex items-center justify-center gap-2"

>

<RotateCcw size={18}/>

Refresh

</button>



<button

className="bg-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-200"

>

<Filter size={20}/>

</button>



</div>


</div>

)


}


export default TeacherToolbar;