import { motion } from "framer-motion";

import {
  CircularProgressbar,
  buildStyles,
} from "react-circular-progressbar";

import "react-circular-progressbar/dist/styles.css";

function TeacherProgressCards({ stats }) {

  const data = [

    {

      title:"Courses",

      value:stats.courses,

      max:10,

      color:"#2563eb",

    },

    {

      title:"Students",

      value:stats.students,

      max:300,

      color:"#16a34a",

    },

    {

      title:"Assignments",

      value:stats.assignments,

      max:100,

      color:"#ea580c",

    },

  ];

  return (

    <motion.div

      initial={{opacity:0,y:30}}

      animate={{opacity:1,y:0}}

      className="bg-white rounded-3xl shadow-xl p-6"

    >

      <h2 className="text-2xl font-bold mb-8">

        Teaching Progress

      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        {

          data.map((item)=>(

            <div

              key={item.title}

              className="flex flex-col items-center"

            >

              <div className="w-32 h-32">

                <CircularProgressbar

                  value={(item.value/item.max)*100}

                  text={`${item.value}`}

                  styles={buildStyles({

                    textSize:"18px",

                    pathColor:item.color,

                    textColor:"#111827",

                    trailColor:"#E5E7EB",

                  })}

                />

              </div>

              <h3 className="mt-5 font-semibold text-lg">

                {item.title}

              </h3>

              <p className="text-gray-500">

                {item.value} / {item.max}

              </p>

            </div>

          ))

        }

      </div>

    </motion.div>

  );

}

export default TeacherProgressCards;