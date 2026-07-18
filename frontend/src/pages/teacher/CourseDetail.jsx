import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  BookOpen,
  Users,
  ClipboardList,
  GraduationCap,
  Megaphone,
  ArrowRight,
} from "lucide-react";

function CourseDetail() {

  const { id } = useParams();

  const navigate = useNavigate();

  const menu = [

    {
      title: "Students",
      description: "View enrolled students",
      icon: <Users size={34} />,
      path: `/teacher/course/${id}/students`,
      bg: "from-blue-600 to-cyan-500",
    },

    {
      title: "Attendance",
      description: "Mark daily attendance",
      icon: <ClipboardList size={34} />,
      path: `/teacher/course/${id}/attendance`,
      bg: "from-green-600 to-emerald-500",
    },

    {
      title: "Assignments",
      description: "Create & manage assignments",
      icon: <BookOpen size={34} />,
      path: `/teacher/course/${id}/assignments`,
      bg: "from-orange-500 to-amber-500",
    },

    {
      title: "Grades",
      description: "Manage student grades",
      icon: <GraduationCap size={34} />,
      path: `/teacher/course/${id}/grades`,
      bg: "from-purple-600 to-fuchsia-500",
    },

    {
      title: "Announcements",
      description: "Post course announcements",
      icon: <Megaphone size={34} />,
      path: `/teacher/course/${id}/announcements`,
      bg: "from-pink-600 to-rose-500",
    },

  ];

  return (

    <div className="space-y-8">

      {/* Hero */}

      <motion.div

        initial={{ opacity: 0, y: -20 }}

        animate={{ opacity: 1, y: 0 }}

        className="rounded-3xl overflow-hidden bg-gradient-to-r from-indigo-700 via-blue-600 to-cyan-500 shadow-2xl"

      >

        <div className="bg-white/10 backdrop-blur-md p-10">

          <h1 className="text-5xl font-bold text-white">

            Course Dashboard

          </h1>

          <p className="text-blue-100 mt-4 text-lg">

            Manage students, attendance, assignments,
            grades and announcements from one place.

          </p>

        </div>

      </motion.div>

      {/* Stats */}

      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-white rounded-3xl shadow-lg p-6">

          <p className="text-gray-500">

            Course ID

          </p>

          <h2 className="text-4xl font-bold mt-2">

            #{id}

          </h2>

        </div>

        <div className="bg-white rounded-3xl shadow-lg p-6">

          <p className="text-gray-500">

            Modules

          </p>

          <h2 className="text-4xl font-bold mt-2">

            5

          </h2>

        </div>

        <div className="bg-white rounded-3xl shadow-lg p-6">

          <p className="text-gray-500">

            Status

          </p>

          <h2 className="text-3xl font-bold text-green-600 mt-2">

            Active

          </h2>

        </div>

      </div>

      {/* Menu */}

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

        {

          menu.map((item, index) => (

            <motion.div

              key={index}

              whileHover={{

                y: -8,

                scale: 1.02,

              }}

              className="bg-white rounded-3xl shadow-xl overflow-hidden"

            >

              <div

                className={`bg-gradient-to-r ${item.bg} p-6 text-white flex justify-between items-center`}

              >

                {item.icon}

                <ArrowRight />

              </div>

              <div className="p-6">

                <h2 className="text-2xl font-bold text-gray-800">

                  {item.title}

                </h2>

                <p className="text-gray-500 mt-3">

                  {item.description}

                </p>

                <button

                  onClick={() => navigate(item.path)}

                  className="

                  mt-8

                  w-full

                  bg-gradient-to-r

                  from-blue-600

                  to-cyan-500

                  text-white

                  py-3

                  rounded-2xl

                  font-semibold

                  hover:shadow-xl

                  transition

                  "

                >

                  Open

                </button>

              </div>

            </motion.div>

          ))

        }

      </div>

    </div>

  );

}

export default CourseDetail;