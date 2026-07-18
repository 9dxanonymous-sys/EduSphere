import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CalendarDays, Clock3, Sun, CloudSun, MoonStar } from "lucide-react";

function WelcomeBanner({ username }) {
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
    hour < 12 ? Sun : hour < 17 ? CloudSun : MoonStar;

  return (
    <motion.div
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="rounded-3xl overflow-hidden bg-gradient-to-r from-indigo-700 via-blue-600 to-cyan-500 shadow-2xl"
    >
      <div className="backdrop-blur-md bg-white/10 p-8">

        <div className="flex flex-col lg:flex-row justify-between items-center">

          <div>

            <div className="flex items-center gap-3">

              <GreetingIcon size={32} className="text-yellow-300" />

              <h2 className="text-white text-2xl font-semibold">
                {greeting}
              </h2>

            </div>

            <h1 className="text-5xl font-bold text-white mt-4">
              Welcome, {username}
            </h1>

            <p className="text-blue-100 mt-5 max-w-xl leading-7">
              Manage students, teachers and university records from one
              professional dashboard.
            </p>

          </div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="mt-8 lg:mt-0 bg-white/15 backdrop-blur-lg rounded-2xl p-6 w-72 border border-white/20"
          >

            <div className="flex items-center gap-2 text-white">

              <Clock3 />

              <span className="font-semibold">
                Live Time
              </span>

            </div>

            <h2 className="text-4xl font-bold mt-4 text-white">
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

          </motion.div>

        </div>

      </div>
    </motion.div>
  );
}

export default WelcomeBanner;