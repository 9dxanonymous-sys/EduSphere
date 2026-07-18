import { motion } from "framer-motion";

import {
 Pencil,
 Trash2,
 BookOpen,
 UserPlus,
 GraduationCap
} from "lucide-react";


function TeacherTable({

teachers,

onEdit,

onDelete,

onAssignCourse,

onViewCourses

}) {


return (

<motion.div

initial={{opacity:0,y:20}}

animate={{opacity:1,y:0}}

className="bg-white rounded-3xl shadow-xl overflow-hidden"

>


<div className="p-6 border-b bg-gradient-to-r from-slate-50 to-blue-50">


<h2 className="text-2xl font-bold">
Teachers List
</h2>


<p className="text-gray-500 mt-1">
Total Teachers : {teachers.length}
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
Teacher
</th>


<th className="p-4 text-left">
Email
</th>


<th className="p-4 text-center">
Department
</th>


<th className="p-4 text-center">
Actions
</th>


</tr>


</thead>



<tbody>


{
teachers.length===0 ? (

<tr>

<td
colSpan="5"
className="text-center py-10 text-gray-500"
>

No Teachers Found

</td>

</tr>


)

:


teachers.map((teacher,index)=>(


<motion.tr

key={teacher.id}

initial={{opacity:0}}

animate={{opacity:1}}

transition={{delay:index*0.03}}

className="border-b hover:bg-blue-50 transition"

>


<td className="p-5 font-semibold">
#{teacher.id}
</td>



<td className="p-5">


<div className="flex items-center gap-3">


<div className="w-11 h-11 rounded-full bg-gradient-to-r from-indigo-600 to-blue-500 text-white flex items-center justify-center font-bold">

{teacher.full_name.charAt(0)}

</div>



<div>

<p className="font-semibold">
{teacher.full_name}
</p>


<p className="text-xs text-gray-500">
Faculty Member
</p>


</div>


</div>


</td>



<td className="p-5 text-gray-600">

{teacher.email}

</td>



<td className="p-5 text-center">


<span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-semibold">

{teacher.department}

</span>


</td>



<td className="p-5">


<div className="flex justify-center gap-2 flex-wrap">


<button

onClick={()=>onEdit(teacher)}

className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-lg"

>

<Pencil size={18}/>

</button>



<button

onClick={()=>onDelete(teacher)}

className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg"

>

<Trash2 size={18}/>

</button>



<button

onClick={()=>onAssignCourse(teacher)}

className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-lg"

>

<UserPlus size={18}/>

</button>



<button

onClick={()=>onViewCourses(teacher)}

className="bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-lg"

>

<BookOpen size={18}/>

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


export default TeacherTable;