import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  CalendarDays,
  Clock3,
  Sun,
  CloudSun,
  MoonStar,
  GraduationCap,
} from "lucide-react";

function StudentHeader() {

  const user = JSON.parse(localStorage.getItem("user"));

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {

    const timer = setInterval(() => {

      setCurrentTime(new Date());

    }, 1000);

    return () => clearInterval(timer);

  }, []);

  const hour = currentTime.getHours();

  const greeting =
    hour < 12
      ? "Good Morning"
      : hour < 17
      ? "Good Afternoon"
      : "Good Evening";

  const GreetingIcon =
    hour < 12
      ? Sun
      : hour < 17
      ? CloudSun
      : MoonStar;

  return (

    <motion.div

      initial={{ opacity: 0, y: -40 }}

      animate={{ opacity: 1, y: 0 }}

      transition={{ duration: 0.6 }}

      className="rounded-3xl overflow-hidden bg-gradient-to-r from-indigo-700 via-blue-600 to-cyan-500 shadow-2xl mb-8"

    >

      <div className="backdrop-blur-md bg-white/10 p-8">

        <div className="flex flex-col lg:flex-row justify-between items-center">

          {/* Left */}

          <div>

            <div className="flex items-center gap-3">

              <GreetingIcon
                size={32}
                className="text-yellow-300"
              />

              <h2 className="text-white text-2xl font-semibold">
                {greeting}
              </h2>

            </div>

            <h1 className="text-5xl font-bold text-white mt-4">
              Welcome, {user?.username}
            </h1>

            <p className="text-blue-100 mt-5 max-w-xl leading-7 text-lg">

              Track your courses, attendance, assignments,
              grades and timetable — all in one place.

            </p>

          </div>

          {/* Right */}

          <motion.div

            whileHover={{ scale: 1.05 }}

            className="

            mt-8

            lg:mt-0

            bg-white/15

            backdrop-blur-xl

            rounded-3xl

            p-6

            w-80

            border

            border-white/20

            "

          >

            <div className="flex items-center justify-between">

              <div className="flex items-center gap-2 text-white">

                <Clock3 />

                <span className="font-semibold">
                  Live Time
                </span>

              </div>

              <GraduationCap className="text-yellow-300" />

            </div>

            <h2 className="text-4xl font-bold mt-5 text-white">
              {currentTime.toLocaleTimeString()}
            </h2>

            <div className="flex items-center gap-2 mt-6 text-blue-100">

              <CalendarDays size={18} />

              <span>

                {currentTime.toLocaleDateString("en-US", {

                  weekday: "long",

                  month: "long",

                  day: "numeric",

                  year: "numeric",

                })}

              </span>

            </div>

            <div className="mt-6 h-2 rounded-full bg-white/20 overflow-hidden">

              <motion.div

                animate={{ width: ["15%", "100%", "15%"] }}

                transition={{ duration: 6, repeat: Infinity }}

                className="h-full bg-yellow-300"

              />

            </div>

          </motion.div>

        </div>

      </div>

    </motion.div>

  );

}

export default StudentHeader;