import { motion } from "framer-motion";
import {
  BookOpen,
  Users,
  ArrowRight,
  GraduationCap,
} from "lucide-react";

function CourseCard({ course, onClick }) {

  return (

    <motion.div

      whileHover={{
        y: -8,
        scale: 1.02,
      }}

      transition={{
        duration: 0.25,
      }}

      onClick={onClick}

      className="

      bg-white

      rounded-3xl

      shadow-lg

      hover:shadow-2xl

      cursor-pointer

      overflow-hidden

      "

    >

      <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-6 text-white">

        <div className="flex justify-between items-center">

          <div>

            <h2 className="text-2xl font-bold">

              {course.course_name}

            </h2>

            <p className="text-blue-100 mt-2">

              {course.course_code}

            </p>

          </div>

          <div className="bg-white/20 p-4 rounded-2xl">

            <BookOpen size={34} />

          </div>

        </div>

      </div>

      <div className="p-6">

        <div className="space-y-4">

          <div className="flex justify-between">

            <span className="flex items-center gap-2 text-gray-500">

              <GraduationCap size={18}/>

              Credit Hours

            </span>

            <span className="font-bold">

              {course.credit_hours}

            </span>

          </div>

          <div className="flex justify-between">

            <span className="flex items-center gap-2 text-gray-500">

              <Users size={18}/>

              Students

            </span>

            <span className="font-bold">

              {course.students || 0}

            </span>

          </div>

        </div>

        <button

          onClick={(e)=>{

            e.stopPropagation();

            onClick();

          }}

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

          flex

          justify-center

          items-center

          gap-2

          hover:shadow-xl

          transition

          "

        >

          Open Course

          <ArrowRight size={18}/>

        </button>

      </div>

    </motion.div>

  );

}

export default CourseCard;