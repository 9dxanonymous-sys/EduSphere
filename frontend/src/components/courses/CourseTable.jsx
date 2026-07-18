import { motion } from "framer-motion";

import {
Pencil,
Trash2,
BookOpen
} from "lucide-react";


function CourseTable({

courses,
onEdit,
onDelete

}) {


return (

<motion.div

initial={{opacity:0,y:20}}

animate={{opacity:1,y:0}}

className="bg-white rounded-3xl shadow-xl overflow-hidden"

>


<div className="p-6 border-b bg-gradient-to-r from-slate-50 to-blue-50">


<h2 className="text-2xl font-bold">

Courses List

</h2>


<p className="text-gray-500">

Total Courses : {courses.length}

</p>


</div>





<div className="overflow-x-auto">


<table className="w-full">


<thead className="bg-gray-100">


<tr>


<th className="p-4 text-left">
ID
</th>


<th className="p-4 text-left">
Code
</th>


<th className="p-4 text-left">
Course Name
</th>


<th className="p-4 text-center">
Credit Hours
</th>


<th className="p-4 text-center">
Actions
</th>


</tr>


</thead>





<tbody>


{

courses.length===0 ?


<tr>

<td
colSpan="5"
className="text-center py-10 text-gray-500"
>

No Courses Found

</td>

</tr>



:

courses.map((course,index)=>(



<motion.tr

key={course.id}

initial={{opacity:0}}

animate={{opacity:1}}

transition={{delay:index*0.03}}

className="border-b hover:bg-blue-50 transition"


>



<td className="p-5 font-semibold">

#{course.id}

</td>




<td className="p-5">


<span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-semibold">

{course.course_code}

</span>


</td>





<td className="p-5">


<div className="flex items-center gap-3">


<div className="bg-indigo-100 p-3 rounded-xl">


<BookOpen
size={22}
className="text-indigo-600"
/>


</div>


<p className="font-semibold">

{course.course_name}

</p>


</div>


</td>






<td className="p-5 text-center">


<span className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold">

{course.credit_hours}

</span>


</td>







<td className="p-5">


<div className="flex justify-center gap-2">



<button

onClick={()=>onEdit(course)}

className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-lg"

>

<Pencil size={18}/>

</button>





<button

onClick={()=>onDelete(course)}

className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg"

>


<Trash2 size={18}/>


</button>





</div>


</td>



</motion.tr>



))


}



</tbody>


</table>


</div>



</motion.div>


)

}


export default CourseTable;