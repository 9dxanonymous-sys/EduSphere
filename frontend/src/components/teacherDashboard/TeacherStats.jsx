import { motion } from "framer-motion";
import {
  BookOpen,
  Users,
  ClipboardList,
  Megaphone,
} from "lucide-react";

function TeacherStats({ stats }) {

  const cards = [

    {
      title: "Courses",
      value: stats.courses,
      icon: BookOpen,
      color: "from-blue-500 to-indigo-600",
    },

    {
      title: "Students",
      value: stats.students,
      icon: Users,
      color: "from-green-500 to-emerald-600",
    },

    {
      title: "Assignments",
      value: stats.assignments,
      icon: ClipboardList,
      color: "from-orange-500 to-red-500",
    },

    {
      title: "Announcements",
      value: stats.announcements,
      icon: Megaphone,
      color: "from-purple-500 to-pink-600",
    },

  ];

  return (

    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

      {cards.map((card, index) => {

        const Icon = card.icon;

        return (

          <motion.div

            key={card.title}

            initial={{ opacity: 0, y: 25 }}

            animate={{ opacity: 1, y: 0 }}

            transition={{ delay: index * 0.12 }}

            whileHover={{
              y: -8,
              scale: 1.03,
            }}

            className={`bg-gradient-to-r ${card.color} rounded-3xl p-6 shadow-xl text-white`}

          >

            <div className="flex justify-between items-center">

              <div>

                <p className="text-white/80">

                  Total {card.title}

                </p>

                <h2 className="text-5xl font-bold mt-3">

                  {card.value}

                </h2>

              </div>

              <div className="bg-white/20 rounded-2xl p-4">

                <Icon size={38} />

              </div>

            </div>

          </motion.div>

        );

      })}

    </div>

  );

}

export default TeacherStats;