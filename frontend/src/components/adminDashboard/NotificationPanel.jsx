import { motion } from "framer-motion";
import {
  Bell,
  UserPlus,
  BookOpen,
  ShieldCheck,
  DatabaseBackup,
} from "lucide-react";

function NotificationPanel() {

  const notifications = [
    {
      icon: UserPlus,
      title: "New Student Registered",
      time: "5 minutes ago",
      color: "text-blue-600",
      bg: "bg-blue-100",
    },
    {
      icon: BookOpen,
      title: "Course Information Updated",
      time: "20 minutes ago",
      color: "text-green-600",
      bg: "bg-green-100",
    },
    {
      icon: ShieldCheck,
      title: "Security Check Completed",
      time: "1 hour ago",
      color: "text-purple-600",
      bg: "bg-purple-100",
    },
    {
      icon: DatabaseBackup,
      title: "System Backup Successful",
      time: "Today",
      color: "text-orange-600",
      bg: "bg-orange-100",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white rounded-3xl border border-gray-100 shadow-lg p-6"
    >

      <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3 mb-6">

        <div className="bg-blue-100 p-3 rounded-xl">

          <Bell className="text-blue-600"/>

        </div>

        Notifications

      </h2>

      <div className="space-y-4">

        {notifications.map((item,index)=>{

          const Icon=item.icon;

          return(

            <motion.div
              key={index}
              whileHover={{scale:1.02}}
              className="flex items-center gap-4 bg-gray-50 hover:bg-blue-50 rounded-2xl p-4 transition-all"
            >

              <div className={`${item.bg} p-3 rounded-xl`}>

                <Icon className={item.color}/>

              </div>

              <div className="flex-1">

                <h3 className="font-semibold text-gray-800">

                  {item.title}

                </h3>

                <p className="text-sm text-gray-500">

                  {item.time}

                </p>

              </div>

            </motion.div>

          );

        })}

      </div>

    </motion.div>
  );

}

export default NotificationPanel;