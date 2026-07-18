import { motion } from "framer-motion";
import {
  ClipboardList,
  CheckCircle2,
  Circle,
} from "lucide-react";

function TeacherPendingTasks(){

  const tasks=[

    {
      title:"Check Attendance",
      completed:true,
    },

    {
      title:"Upload Assignments",
      completed:false,
    },

    {
      title:"Update Grades",
      completed:false,
    },

    {
      title:"Post Announcement",
      completed:true,
    },

  ];

  return(

    <motion.div

      initial={{opacity:0,y:30}}

      animate={{opacity:1,y:0}}

      className="bg-white rounded-3xl shadow-xl p-6"

    >

      <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">

        <ClipboardList className="text-blue-600"/>

        Pending Tasks

      </h2>

      <div className="space-y-4">

        {tasks.map((task,index)=>(

          <div

            key={index}

            className="flex items-center gap-4 bg-gray-50 rounded-xl p-4"

          >

            {

              task.completed

              ?

              <CheckCircle2 className="text-green-500"/>

              :

              <Circle className="text-gray-400"/>

            }

            <span

              className={

                task.completed

                ?

                "line-through text-gray-400"

                :

                "font-medium"

              }

            >

              {task.title}

            </span>

          </div>

        ))}

      </div>

    </motion.div>

  )

}

export default TeacherPendingTasks;