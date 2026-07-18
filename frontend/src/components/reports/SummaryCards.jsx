import { motion } from "framer-motion";
import {
  GraduationCap,
  Users,
  BookOpen,
} from "lucide-react";

function SummaryCards({ summary }) {

  const cards = [

    {
      title: "Students",
      value: summary.total_students,
      icon: GraduationCap,
      color: "from-blue-600 to-indigo-600",
    },

    {
      title: "Teachers",
      value: summary.total_teachers,
      icon: Users,
      color: "from-green-600 to-emerald-600",
    },

    {
      title: "Courses",
      value: summary.total_courses,
      icon: BookOpen,
      color: "from-orange-500 to-red-500",
    },

  ];

  return (

    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">

      {cards.map((card, index) => {

        const Icon = card.icon;

        return (

          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15 }}
            whileHover={{
              scale: 1.03,
            }}
            className={`bg-gradient-to-r ${card.color} rounded-2xl shadow-xl text-white p-6`}
          >

            <div className="flex justify-between items-center">

              <div>

                <p className="text-white/80">

                  {card.title}

                </p>

                <h2 className="text-5xl font-bold mt-3">

                  {card.value}

                </h2>

              </div>

              <div className="bg-white/20 p-4 rounded-2xl">

                <Icon size={42} />

              </div>

            </div>

            <div className="mt-6 h-2 bg-white/20 rounded-full">

              <div className="w-4/5 h-full rounded-full bg-white"></div>

            </div>

          </motion.div>

        );

      })}

    </div>

  );
}

export default SummaryCards;