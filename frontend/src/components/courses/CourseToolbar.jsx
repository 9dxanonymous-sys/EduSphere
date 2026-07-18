import {
Search,
RotateCcw
} from "lucide-react";


function CourseToolbar({

search,
setSearch,
onRefresh

}) {


return (

<div className="bg-white rounded-2xl shadow-lg p-5 mb-8">


<div className="flex flex-col md:flex-row gap-4">


<div className="relative flex-1">


<Search

size={18}

className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"

/>



<input


type="text"


placeholder="Search course name or code..."


value={search}


onChange={(e)=>setSearch(e.target.value)}


className="w-full border rounded-xl py-3 pl-11 pr-4 outline-none focus:ring-2 focus:ring-blue-500"



/>



</div>





<button


onClick={onRefresh}


className="bg-blue-600 hover:bg-blue-700 text-white px-6 rounded-xl flex items-center justify-center gap-2"


>


<RotateCcw size={18}/>

Refresh


</button>




</div>


</div>

)


}


export default CourseToolbar;