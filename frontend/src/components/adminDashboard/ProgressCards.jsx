import { motion } from "framer-motion";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function ProgressCards({ counts }) {

  const data = [
    {
      title: "Students",
      value: counts.total_students,
      max: 500,
      color: "#2563EB",
    },
    {
      title: "Teachers",
      value: counts.total_teachers,
      max: 100,
      color: "#16A34A",
    },
    {
      title: "Courses",
      value: counts.total_courses,
      max: 50,
      color: "#EA580C",
    },
  ];

  return (

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-3xl border border-gray-100 shadow-lg p-6"
    >

      <h2 className="text-2xl font-bold text-gray-800 mb-8">
        Capacity Overview
      </h2>

      <div className="grid md:grid-cols-3 gap-8">

        {data.map((item) => (

          <div
            key={item.title}
            className="flex flex-col items-center rounded-2xl p-5 hover:bg-gray-50 transition"
          >

            <div className="w-28 h-28">

              <CircularProgressbar
                value={(item.value / item.max) * 100}
                text={`${item.value}`}
                styles={buildStyles({
                  pathColor: item.color,
                  textColor: "#111827",
                  trailColor: "#E5E7EB",
                  textSize: "18px",
                })}
              />

            </div>

            <h3 className="mt-5 text-lg font-semibold text-gray-800">
              {item.title}
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              {item.value} / {item.max}
            </p>

          </div>

        ))}

      </div>

    </motion.div>

  );

}

export default ProgressCards;