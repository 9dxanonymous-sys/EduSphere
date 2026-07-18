import { motion } from "framer-motion";
import {
  ClipboardList,
  CheckCircle2,
  Circle,
} from "lucide-react";

function PendingTasks(){

  const tasks=[

    {
      title:"Register New Students",
      completed:true,
    },

    {
      title:"Manage Teacher Accounts",
      completed:true,
    },

    {
      title:"Update Course Information",
      completed:false,
    },

    {
      title:"Review University Reports",
      completed:false,
    },

  ];

  return(

    <motion.div
      initial={{opacity:0,y:20}}
      animate={{opacity:1,y:0}}
      className="bg-white rounded-3xl border border-gray-100 shadow-lg p-6"
    >

      <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3 mb-6">

        <div className="bg-blue-100 p-3 rounded-xl">

          <ClipboardList className="text-blue-600"/>

        </div>

        Pending Tasks

      </h2>

      <div className="space-y-4">

        {tasks.map((task,index)=>(

          <motion.div

            key={index}

            whileHover={{x:5}}

            className="flex items-center gap-4 bg-gray-50 hover:bg-blue-50 rounded-2xl p-4 transition-all"

          >

            {

              task.completed ?

              <CheckCircle2
                size={24}
                className="text-green-500"
              />

              :

              <Circle
                size={22}
                className="text-gray-400"
              />

            }

            <div className="flex-1">

              <p

                className={

                  task.completed

                  ?

                  "text-gray-400 line-through"

                  :

                  "font-semibold text-gray-800"

                }

              >

                {task.title}

              </p>

            </div>

          </motion.div>

        ))}

      </div>

    </motion.div>

  );

}

export default PendingTasks;