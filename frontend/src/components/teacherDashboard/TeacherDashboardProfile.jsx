import { motion } from "framer-motion";
import {
  UserCircle2,
  BadgeCheck,
  CalendarDays,
  BookOpen,
} from "lucide-react";

function TeacherDashboardProfile({ user }) {

  return (

    <motion.div

      initial={{ opacity:0, x:30 }}

      animate={{ opacity:1, x:0 }}

      className="bg-white rounded-3xl shadow-xl p-6"

    >

      <div className="flex flex-col items-center">

        <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-5 rounded-full text-white">

          <UserCircle2 size={70} />

        </div>

        <h2 className="text-2xl font-bold mt-5">

          {user?.username}

        </h2>

        <p className="text-gray-500">

          Lecturer

        </p>

      </div>

      <div className="mt-8 space-y-4">

        <div className="flex justify-between">

          <span className="flex items-center gap-2">

            <BookOpen size={18}/>

            Courses

          </span>

          <span className="font-semibold">

            Assigned

          </span>

        </div>

        <div className="flex justify-between">

          <span className="flex items-center gap-2">

            <BadgeCheck size={18}/>

            Status

          </span>

          <span className="text-green-600 font-semibold">

            Active

          </span>

        </div>

        <div className="flex justify-between">

          <span className="flex items-center gap-2">

            <CalendarDays size={18}/>

            Today

          </span>

          <span>

            Available

          </span>

        </div>

      </div>

    </motion.div>

  );

}

export default TeacherDashboardProfile;