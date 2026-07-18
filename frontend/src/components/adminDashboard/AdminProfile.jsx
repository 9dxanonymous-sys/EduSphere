import { motion } from "framer-motion";
import {
  UserCircle2,
  BadgeCheck,
  CalendarDays,
  Shield,
} from "lucide-react";

function AdminProfile({ user }) {

  return (

    <motion.div

      initial={{ opacity: 0, x: 30 }}

      animate={{ opacity: 1, x: 0 }}

      className="bg-white rounded-3xl border border-gray-100 shadow-xl p-6"

    >

      <div className="flex flex-col items-center">

        <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-5 rounded-full text-white shadow-lg">

          <UserCircle2 size={68} />

        </div>

        <h2 className="text-2xl font-bold mt-5 text-gray-800">

          {user.username}

        </h2>

        <p className="text-gray-500">

          System Administrator

        </p>

      </div>

      <div className="mt-8 space-y-5">

        <div className="flex justify-between items-center">

          <span className="flex items-center gap-2 text-gray-700">

            <Shield
              size={18}
              className="text-blue-600"
            />

            Role

          </span>

          <span className="font-semibold text-gray-800">

            Administrator

          </span>

        </div>

        <div className="flex justify-between items-center">

          <span className="flex items-center gap-2 text-gray-700">

            <BadgeCheck
              size={18}
              className="text-green-600"
            />

            Status

          </span>

          <span className="font-semibold text-green-600">

            Active

          </span>

        </div>

        <div className="flex justify-between items-center">

          <span className="flex items-center gap-2 text-gray-700">

            <CalendarDays
              size={18}
              className="text-orange-500"
            />

            Last Login

          </span>

          <span className="font-medium text-gray-800">

            Today

          </span>

        </div>

      </div>

    </motion.div>

  );

}

export default AdminProfile;