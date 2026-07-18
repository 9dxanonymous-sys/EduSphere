import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  User,
  BookOpen,
  GraduationCap
} from "lucide-react";

function DetailModal({
  open,
  onClose,
  title,
  data,
  type,
}) {

  if (!open) return null;

  return (

    <AnimatePresence>

      <motion.div

        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}

        className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50"

      >

        <motion.div

          initial={{
            scale: .8,
            opacity: 0,
            y: 30,
          }}

          animate={{
            scale: 1,
            opacity: 1,
            y: 0,
          }}

          exit={{
            scale: .8,
            opacity: 0,
          }}

          className="bg-white rounded-3xl shadow-2xl w-[750px] max-w-[95%] overflow-hidden"

        >

          <div className="bg-gradient-to-r from-indigo-700 via-blue-600 to-cyan-500 text-white p-6 flex justify-between items-center">

            <h2 className="text-2xl font-bold">
              {title}
            </h2>

            <button onClick={onClose}>
              <X size={28}/>
            </button>

          </div>

          <div className="p-8">

            {type==="course" && (

              <>

                <div className="flex items-center gap-3 mb-6">

                  <BookOpen className="text-blue-600"/>

                  <h3 className="text-xl font-bold">
                    {data?.course_name}
                  </h3>

                </div>

                <div className="bg-gray-100 rounded-xl p-4 mb-6">

                  <p>

                    <b>Teacher:</b> {data?.teacher}

                  </p>

                </div>

                <h3 className="font-bold text-lg mb-4">

                  Enrolled Students

                </h3>

                <div className="space-y-3">

                  {data?.students?.map((student)=>(

                    <div
                      key={student.id}
                      className="border rounded-xl p-4 flex justify-between"
                    >

                      <span>

                        {student.full_name}

                      </span>

                      <span>

                        {student.department}

                      </span>

                    </div>

                  ))}

                </div>

              </>

            )}

            {type==="teacher" && (

              <>

                <div className="flex items-center gap-3 mb-6">

                  <User className="text-green-600"/>

                  <h3 className="text-xl font-bold">

                    {data?.teacher}

                  </h3>

                </div>

                <p className="mb-5">

                  <b>Department:</b> {data?.department}

                </p>

                <h3 className="font-bold mb-4">

                  Assigned Courses

                </h3>

                <div className="grid gap-3">

                  {data?.courses?.map(course=>(

                    <div
                      key={course.id}
                      className="border rounded-xl p-4"
                    >

                      {course.course_name}

                    </div>

                  ))}

                </div>

              </>

            )}

            {type==="student" && (

              <>

                <div className="flex items-center gap-3 mb-6">

                  <GraduationCap className="text-purple-600"/>

                  <h3 className="text-xl font-bold">

                    {data?.student}

                  </h3>

                </div>

                <p>

                  <b>Department:</b> {data?.department}

                </p>

                <p className="mb-5">

                  <b>Semester:</b> {data?.semester}

                </p>

                <h3 className="font-bold mb-4">

                  Enrolled Courses

                </h3>

                <div className="grid gap-3">

                  {data?.courses?.map(course=>(

                    <div
                      key={course.id}
                      className="border rounded-xl p-4"
                    >

                      {course.course_name}

                    </div>

                  ))}

                </div>

              </>

            )}

          </div>

        </motion.div>

      </motion.div>

    </AnimatePresence>

  );

}

export default DetailModal;