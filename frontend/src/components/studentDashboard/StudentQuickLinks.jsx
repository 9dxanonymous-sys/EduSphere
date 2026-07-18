import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  BookOpen,
  CalendarCheck2,
  ClipboardList,
  GraduationCap,
  Megaphone,
  Settings,
  Zap,
} from "lucide-react";

function StudentQuickLinks() {

  const navigate = useNavigate();

  const links = [

    {
      title: "My Courses",
      icon: BookOpen,
      path: "/student/courses",
      color: "text-blue-600",
    },

    {
      title: "Attendance",
      icon: CalendarCheck2,
      path: "/student/attendance",
      color: "text-green-600",
    },

    {
      title: "Assignments",
      icon: ClipboardList,
      path: "/student/assignments",
      color: "text-orange-500",
    },

    {
      title: "Grades",
      icon: GraduationCap,
      path: "/student/grades",
      color: "text-purple-600",
    },

    {
      title: "Announcements",
      icon: Megaphone,
      path: "/student/announcements",
      color: "text-pink-600",
    },

    {
      title: "Settings",
      icon: Settings,
      path: "/student/settings",
      color: "text-gray-600",
    },

  ];

  return (

    <motion.div

      initial={{ opacity: 0, y: 30 }}

      animate={{ opacity: 1, y: 0 }}

      className="bg-white rounded-3xl shadow-xl p-6"

    >

      <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
        <Zap className="text-blue-600" />
        Quick Links
      </h2>

      <div className="space-y-4">

        {

          links.map((item) => {

            const Icon = item.icon;

            return (

              <motion.div

                key={item.title}

                whileHover={{ scale: 1.03 }}

                onClick={() => navigate(item.path)}

                className="flex items-center gap-4 bg-gray-50 rounded-2xl p-4 cursor-pointer"

              >

                <div className="bg-white shadow p-3 rounded-xl">
                  <Icon className={item.color} />
                </div>

                <span className="font-semibold">
                  {item.title}
                </span>

              </motion.div>

            );

          })

        }

      </div>

    </motion.div>

  );

}

export default StudentQuickLinks;