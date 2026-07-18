import { motion } from "framer-motion";
import {
  Bell,
  BookOpen,
  ClipboardCheck,
  Users,
  GraduationCap,
} from "lucide-react";

function TeacherNotificationPanel() {

  const notifications = [

    {
      icon: Users,
      title: "New Student Joined",
      time: "10 min ago",
      color: "text-blue-600",
    },

    {
      icon: ClipboardCheck,
      title: "Assignment Submitted",
      time: "30 min ago",
      color: "text-green-600",
    },

    {
      icon: BookOpen,
      title: "Course Updated",
      time: "Today",
      color: "text-orange-600",
    },

    {
      icon: GraduationCap,
      title: "Semester Started",
      time: "Recently",
      color: "text-purple-600",
    },

  ];

  return (

    <motion.div

      initial={{ opacity: 0, x: 30 }}

      animate={{ opacity: 1, x: 0 }}

      className="bg-white rounded-3xl shadow-xl p-6"

    >

      <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">

        <Bell className="text-blue-600"/>

        Notifications

      </h2>

      <div className="space-y-4">

        {notifications.map((item,index)=>{

          const Icon=item.icon;

          return(

            <motion.div

              key={index}

              whileHover={{scale:1.03}}

              className="flex items-center gap-4 bg-gray-50 rounded-2xl p-4"

            >

              <div className="bg-white shadow p-3 rounded-xl">

                <Icon className={item.color}/>

              </div>

              <div>

                <h3 className="font-semibold">

                  {item.title}

                </h3>

                <p className="text-sm text-gray-500">

                  {item.time}

                </p>

              </div>

            </motion.div>

          )

        })}

      </div>

    </motion.div>

  );

}

export default TeacherNotificationPanel;