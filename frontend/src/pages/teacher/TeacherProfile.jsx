import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import {
  User,
  Mail,
  Building,
  BadgeCheck,
  GraduationCap,
  CalendarDays,
  ShieldCheck,
} from "lucide-react";

import {
  getTeacherProfile,
} from "../../services/teacherService";

function TeacherProfile() {

  const [profile, setProfile] = useState(null);

  useEffect(() => {

    loadProfile();

  }, []);

  const loadProfile = async () => {

    try {

      const data = await getTeacherProfile();

      setProfile(data);

    }

    catch (error) {

      console.log(error);

    }

  };

  if (!profile) {

    return (

      <div className="flex justify-center items-center h-[70vh]">

        <div className="text-xl font-semibold text-gray-500">

          Loading Profile...

        </div>

      </div>

    );

  }

  return (

    <div className="space-y-8">

{/* Premium Cover */}

<motion.div

  initial={{ opacity:0, y:-30 }}

  animate={{ opacity:1, y:0 }}

  className="rounded-3xl overflow-hidden shadow-2xl"

>

  <div className="relative h-72 bg-gradient-to-r from-blue-700 via-indigo-700 to-cyan-500">

    {/* Decorative Background */}

    <div className="absolute -right-24 -top-24 w-80 h-80 rounded-full bg-white/10 blur-3xl"/>

    <div className="absolute right-40 bottom-0 w-64 h-64 rounded-full bg-cyan-300/10 blur-3xl"/>

    <div className="absolute left-80 top-4 w-44 h-44 rounded-full bg-white/10 blur-2xl"/>

    {/* Avatar */}

    <div className="absolute bottom-8 left-10">

      <div className="p-1 rounded-full bg-gradient-to-r from-cyan-300 via-white to-blue-400 animate-pulse">

        <div className="w-36 h-36 rounded-full bg-white flex items-center justify-center">

          <div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center text-white">

            <User size={72}/>

          </div>

        </div>

      </div>

    </div>

    {/* Name */}

    <div className="absolute bottom-12 left-56 text-white">

      <h1 className="text-5xl font-bold">

        {profile.full_name}

      </h1>

      <p className="text-blue-100 text-lg mt-2">

        Lecturer • {profile.department}

      </p>

      <div className="flex gap-3 mt-5">

        <span className="px-4 py-2 rounded-full bg-white/20 backdrop-blur-md">

          Active

        </span>

        <span className="px-4 py-2 rounded-full bg-white/20 backdrop-blur-md">

          Faculty Member

        </span>

      </div>

    </div>

    {/* Glass Cards */}

    <div className="absolute right-8 top-8 flex gap-5">

      <div className="bg-white/15 backdrop-blur-xl border border-white/20 rounded-2xl px-6 py-5 text-white">

        <p className="text-blue-100 text-sm">

          Experience

        </p>

        <h2 className="text-3xl font-bold mt-1">

          5+

        </h2>

      </div>

      <div className="bg-white/15 backdrop-blur-xl border border-white/20 rounded-2xl px-6 py-5 text-white">

        <p className="text-blue-100 text-sm">

          Department

        </p>

        <h2 className="text-2xl font-bold mt-1">

          {profile.department}

        </h2>

      </div>

    </div>

  </div>

</motion.div>

      {/* Stats */}

      <div className="grid md:grid-cols-4 gap-6">

        <motion.div

          whileHover={{ y:-5 }}

          className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-3xl p-6 text-white shadow-xl"

        >

          <div className="flex justify-between">

            <div>

              <p className="text-blue-100">

                Teacher ID

              </p>

              <h2 className="text-4xl font-bold mt-2">

                {profile.id}

              </h2>

            </div>

            <BadgeCheck size={40}/>

          </div>

        </motion.div>

        <motion.div

          whileHover={{ y:-5 }}

          className="bg-gradient-to-r from-green-600 to-emerald-500 rounded-3xl p-6 text-white shadow-xl"

        >

          <div className="flex justify-between">

            <div>

              <p className="text-green-100">

                Status

              </p>

              <h2 className="text-3xl font-bold mt-2">

                Active

              </h2>

            </div>

            <ShieldCheck size={40}/>

          </div>

        </motion.div>

        <motion.div

          whileHover={{ y:-5 }}

          className="bg-gradient-to-r from-purple-600 to-indigo-500 rounded-3xl p-6 text-white shadow-xl"

        >

          <div className="flex justify-between">

            <div>

              <p className="text-purple-100">

                Department

              </p>

              <h2 className="text-2xl font-bold mt-2">

                {profile.department}

              </h2>

            </div>

            <Building size={40}/>

          </div>

        </motion.div>

        <motion.div

          whileHover={{ y:-5 }}

          className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-3xl p-6 text-white shadow-xl"

        >

          <div className="flex justify-between">

            <div>

              <p className="text-orange-100">

                Role

              </p>

              <h2 className="text-2xl font-bold mt-2">

                Teacher

              </h2>

            </div>

            <GraduationCap size={40}/>

          </div>

        </motion.div>

      </div>
            {/* Information */}

      <div className="grid lg:grid-cols-2 gap-6">

        <motion.div

          initial={{ opacity: 0, x: -20 }}

          animate={{ opacity: 1, x: 0 }}

          className="bg-white rounded-3xl shadow-xl p-8"

        >

          <h2 className="text-2xl font-bold mb-8">

            Personal Information

          </h2>

          <div className="space-y-6">

            <div className="flex items-center gap-5">

              <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center">

                <User className="text-blue-600"/>

              </div>

              <div>

                <p className="text-gray-500 text-sm">

                  Full Name

                </p>

                <h3 className="font-bold text-lg">

                  {profile.full_name}

                </h3>

              </div>

            </div>

            <div className="flex items-center gap-5">

              <div className="w-14 h-14 rounded-2xl bg-red-100 flex items-center justify-center">

                <Mail className="text-red-500"/>

              </div>

              <div>

                <p className="text-gray-500 text-sm">

                  Email Address

                </p>

                <h3 className="font-bold text-lg break-all">

                  {profile.email}

                </h3>

              </div>

            </div>

            <div className="flex items-center gap-5">

              <div className="w-14 h-14 rounded-2xl bg-purple-100 flex items-center justify-center">

                <Building className="text-purple-600"/>

              </div>

              <div>

                <p className="text-gray-500 text-sm">

                  Department

                </p>

                <h3 className="font-bold text-lg">

                  {profile.department}

                </h3>

              </div>

            </div>

          </div>

        </motion.div>

        {/* Professional Information */}

        <motion.div

          initial={{ opacity: 0, x: 20 }}

          animate={{ opacity: 1, x: 0 }}

          className="bg-white rounded-3xl shadow-xl p-8"

        >

          <h2 className="text-2xl font-bold mb-8">

            Professional Details

          </h2>

          <div className="space-y-6">

            <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-5">

              <div className="flex items-center gap-3">

                <BadgeCheck className="text-blue-600"/>

                <span className="font-medium">

                  Teacher ID

                </span>

              </div>

              <span className="font-bold text-lg">

                #{profile.id}

              </span>

            </div>

            <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-5">

              <div className="flex items-center gap-3">

                <GraduationCap className="text-green-600"/>

                <span className="font-medium">

                  Position

                </span>

              </div>

              <span className="font-bold">

                Lecturer

              </span>

            </div>

            <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-5">

              <div className="flex items-center gap-3">

                <CalendarDays className="text-orange-500"/>

                <span className="font-medium">

                  Availability

                </span>

              </div>

              <span className="font-bold text-green-600">

                Available

              </span>

            </div>

            <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-5">

              <div className="flex items-center gap-3">

                <ShieldCheck className="text-emerald-600"/>

                <span className="font-medium">

                  Account Status

                </span>

              </div>

              <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold">

                Active

              </span>

            </div>

          </div>

        </motion.div>

      </div>

    </div>

  );

}

export default TeacherProfile;