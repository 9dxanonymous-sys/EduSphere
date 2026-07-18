import { motion } from "framer-motion";
import {
  Users,
  Building2,
  BookOpen,
  GraduationCap
} from "lucide-react";


function TeacherStats({teachers}){


  const departments = new Set(
    teachers.map(t=>t.department)
  ).size;


  const cards=[

    {
      title:"Total Teachers",
      value:teachers.length,
      icon:Users,
      color:"from-blue-600 to-indigo-600"
    },


    {
      title:"Departments",
      value:departments,
      icon:Building2,
      color:"from-green-600 to-emerald-600"
    },


    {
      title:"Assigned Courses",
      value:teachers.reduce(
        (sum,t)=>sum+(t.courses?.length || 0),
        0
      ),
      icon:BookOpen,
      color:"from-orange-500 to-red-500"
    },


    {
      title:"Faculty Members",
      value:teachers.length,
      icon:GraduationCap,
      color:"from-purple-600 to-pink-600"
    }

  ];


return(

<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">


{
cards.map((card,index)=>{

const Icon=card.icon;


return(

<motion.div

key={card.title}

initial={{opacity:0,y:20}}

animate={{opacity:1,y:0}}

transition={{delay:index*0.1}}

whileHover={{scale:1.03}}

className={`bg-gradient-to-r ${card.color} text-white rounded-2xl shadow-xl p-6`}

>


<div className="flex justify-between items-center">


<div>

<p className="text-white/80">
{card.title}
</p>


<h2 className="text-5xl font-bold mt-2">
{card.value}
</h2>


</div>


<div className="bg-white/20 p-4 rounded-2xl">

<Icon size={38}/>

</div>


</div>


</motion.div>


)

})

}


</div>

)

}


export default TeacherStats;