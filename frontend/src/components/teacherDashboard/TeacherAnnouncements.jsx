import { motion } from "framer-motion";
import {
  Megaphone,
  CalendarDays,
  BookOpen,
  Users,
} from "lucide-react";

function TeacherAnnouncements(){

  const announcements=[

    {

      icon:BookOpen,

      title:"Assignment Deadline",

      description:"Upload assignment marks before Friday.",

      date:"Today",

      color:"text-blue-600",

    },

    {

      icon:Users,

      title:"Faculty Meeting",

      description:"Department meeting scheduled tomorrow.",

      date:"Tomorrow",

      color:"text-green-600",

    },

    {

      icon:CalendarDays,

      title:"Mid Exams",

      description:"Mid exams will start next week.",

      date:"Next Week",

      color:"text-orange-600",

    },

    {

      icon:Megaphone,

      title:"University Notice",

      description:"Academic calendar updated successfully.",

      date:"Recently",

      color:"text-purple-600",

    },

  ];

  return(

    <motion.div

      initial={{opacity:0,y:30}}

      animate={{opacity:1,y:0}}

      className="bg-white rounded-3xl shadow-xl p-6"

    >

      <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">

        <Megaphone className="text-blue-600"/>

        Announcements

      </h2>

      <div className="grid md:grid-cols-2 gap-5">

        {announcements.map((item,index)=>{

          const Icon=item.icon;

          return(

            <motion.div

              key={index}

              whileHover={{scale:1.03}}

              className="bg-gray-50 rounded-2xl p-5"

            >

              <div className="flex gap-4">

                <div className="bg-white shadow p-3 rounded-xl">

                  <Icon className={item.color}/>

                </div>

                <div>

                  <h3 className="font-bold">

                    {item.title}

                  </h3>

                  <p className="text-gray-500 mt-2">

                    {item.description}

                  </p>

                  <p className="text-sm text-gray-400 mt-3">

                    {item.date}

                  </p>

                </div>

              </div>

            </motion.div>

          )

        })}

      </div>

    </motion.div>

  )

}

export default TeacherAnnouncements;