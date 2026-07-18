import { motion } from "framer-motion";
import {
  Megaphone,
  CalendarDays,
  GraduationCap,
  Users,
  Info,
} from "lucide-react";

function Announcements() {

  const announcements = [
    {
      icon: GraduationCap,
      title: "New Admissions Open",
      description: "Admissions for the upcoming semester are now open.",
      date: "July 2026",
      color: "text-blue-600",
      bg: "bg-blue-100",
    },
    {
      icon: Users,
      title: "Faculty Meeting",
      description: "Monthly faculty meeting is scheduled for Friday.",
      date: "This Week",
      color: "text-green-600",
      bg: "bg-green-100",
    },
    {
      icon: Info,
      title: "System Update",
      description: "University management system updated successfully.",
      date: "Today",
      color: "text-purple-600",
      bg: "bg-purple-100",
    },
    {
      icon: CalendarDays,
      title: "Academic Schedule",
      description: "New academic calendar has been published.",
      date: "Recently",
      color: "text-orange-600",
      bg: "bg-orange-100",
    },
  ];

  return (

    <motion.div

      initial={{ opacity: 0, y: 20 }}

      animate={{ opacity: 1, y: 0 }}

      className="bg-white rounded-3xl border border-gray-100 shadow-lg p-6"

    >

      <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3 mb-8">

        <div className="bg-blue-100 p-3 rounded-xl">

          <Megaphone className="text-blue-600" />

        </div>

        University Announcements

      </h2>

      <div className="grid md:grid-cols-2 gap-6">

        {announcements.map((item, index) => {

          const Icon = item.icon;

          return (

            <motion.div

              key={index}

              whileHover={{
                y: -5,
                scale: 1.02,
              }}

              transition={{
                duration: 0.2,
              }}

              className="bg-gray-50 hover:bg-blue-50 border border-gray-100 rounded-2xl p-5 transition-all"

            >

              <div className="flex gap-4">

                <div

                  className={`${item.bg} w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0`}

                >

                  <Icon

                    size={24}

                    className={item.color}

                  />

                </div>

                <div className="flex-1">

                  <h3 className="text-lg font-bold text-gray-800">

                    {item.title}

                  </h3>

                  <p className="text-gray-500 mt-2 leading-6">

                    {item.description}

                  </p>

                  <span className="inline-block mt-4 text-sm font-medium text-blue-600 bg-blue-100 px-3 py-1 rounded-full">

                    {item.date}

                  </span>

                </div>

              </div>

            </motion.div>

          );

        })}

      </div>

    </motion.div>

  );

}

export default Announcements;