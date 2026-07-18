import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

import {
  ClipboardCheck,
  UserCircle2,
  CheckCircle2,
  XCircle,
  Save,
  Users,
} from "lucide-react";

import {
  getCourseStudents,
  markAttendance,
} from "../../../services/teacherService";

function Attendance() {

  const { id } = useParams();

  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {

      const data = await getCourseStudents(id);

      setStudents(data);

    } catch (err) {

      console.log(err);

    }
  };

  const handleAttendance = (studentId, status) => {

    setAttendance((prev) => ({
      ...prev,
      [studentId]: status,
    }));

  };

  const saveAttendance = async () => {

    try {

      const attendanceData = Object.keys(attendance).map((studentId) => ({
        student_id: Number(studentId),
        status: attendance[studentId],
      }));

      await markAttendance({
        course_id: Number(id),
        attendance: attendanceData,
      });

      alert("Attendance Saved Successfully");

    } catch (err) {

      console.log(err);

      alert("Failed to save attendance");

    }
  };

  const presentCount = Object.values(attendance).filter(
    (x) => x === "Present"
  ).length;

  const absentCount = Object.values(attendance).filter(
    (x) => x === "Absent"
  ).length;

  return (

    <div className="space-y-8">

      {/* Header */}

      <motion.div

        initial={{ opacity: 0, y: -20 }}

        animate={{ opacity: 1, y: 0 }}

        className="flex flex-col lg:flex-row justify-between items-center gap-5"

      >

        <div>

          <h1 className="text-4xl font-bold flex items-center gap-3">

            <ClipboardCheck className="text-blue-600" />

            Attendance

          </h1>

          <p className="text-gray-500 mt-2">

            Mark today's attendance for your students.

          </p>

        </div>

        <button

          onClick={saveAttendance}

          className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:shadow-xl transition-all text-white px-6 py-3 rounded-2xl flex items-center gap-2"

        >

          <Save size={20} />

          Save Attendance

        </button>

      </motion.div>

      {/* Stats */}

      <div className="grid md:grid-cols-3 gap-6">

        {/* Students */}

        <motion.div

          whileHover={{ y: -5 }}

          className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-3xl shadow-xl p-6 text-white"

        >

          <div className="flex justify-between items-center">

            <div>

              <p className="text-blue-100">

                Total Students

              </p>

              <h2 className="text-5xl font-bold mt-2">

                {students.length}

              </h2>

              <p className="mt-3 text-blue-100">

                Enrolled Students

              </p>

            </div>

            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center">

              <Users size={34} />

            </div>

          </div>

        </motion.div>

        {/* Present */}

        <motion.div

          whileHover={{ y: -5 }}

          className="bg-gradient-to-r from-green-600 to-emerald-500 rounded-3xl shadow-xl p-6 text-white"

        >

          <div className="flex justify-between items-center">

            <div>

              <p className="text-green-100">

                Present

              </p>

              <h2 className="text-5xl font-bold mt-2">

                {presentCount}

              </h2>

              <p className="mt-3 text-green-100">

                Students Marked

              </p>

            </div>

            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center">

              <CheckCircle2 size={34} />

            </div>

          </div>

        </motion.div>

        {/* Absent */}

        <motion.div

          whileHover={{ y: -5 }}

          className="bg-gradient-to-r from-red-600 to-rose-500 rounded-3xl shadow-xl p-6 text-white"

        >

          <div className="flex justify-between items-center">

            <div>

              <p className="text-red-100">

                Absent

              </p>

              <h2 className="text-5xl font-bold mt-2">

                {absentCount}

              </h2>

              <p className="mt-3 text-red-100">

                Students Marked

              </p>

            </div>

            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center">

              <XCircle size={34} />

            </div>

          </div>

        </motion.div>

      </div>
            {/* Attendance Table */}

      <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

        <table className="w-full">

          <thead className="bg-slate-900 text-white">

            <tr>

              <th className="px-6 py-4 text-left">

                Student

              </th>

              <th className="px-6 py-4 text-center">

                Present

              </th>

              <th className="px-6 py-4 text-center">

                Absent

              </th>

            </tr>

          </thead>

          <tbody>

            {

              students.length === 0

              ?

              (

                <tr>

                  <td

                    colSpan="3"

                    className="text-center py-14 text-gray-500"

                  >

                    No Students Found

                  </td>

                </tr>

              )

              :

              students.map((student)=>(

                <motion.tr

                  key={student.id}

                  whileHover={{

                    backgroundColor:"#eff6ff",

                  }}

                  transition={{duration:0.2}}

                  className="border-b"

                >

                  <td className="px-6 py-5">

                    <div className="flex items-center gap-4">

                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center text-white shadow">

                        <UserCircle2 size={28}/>

                      </div>

                      <div>

                        <h3 className="font-semibold text-gray-800">

                          {student.full_name}

                        </h3>

                        <p className="text-sm text-gray-500">

                          Semester {student.semester}

                        </p>

                      </div>

                    </div>

                  </td>

                  <td className="text-center">

                    <button

                      onClick={()=>

                        handleAttendance(

                          student.id,

                          "Present"

                        )

                      }

                      className={`

                      w-12

                      h-12

                      rounded-full

                      flex

                      items-center

                      justify-center

                      transition-all

                      duration-300

                      shadow

                      hover:scale-110

                      ${

                        attendance[student.id] === "Present"

                        ?

                        "bg-green-500 text-white"

                        :

                        "bg-green-100 text-green-600 hover:bg-green-500 hover:text-white"

                      }

                      `}

                    >

                      <CheckCircle2 size={24}/>

                    </button>

                  </td>

                  <td className="text-center">

                    <button

                      onClick={()=>

                        handleAttendance(

                          student.id,

                          "Absent"

                        )

                      }

                      className={`

                      w-12

                      h-12

                      rounded-full

                      flex

                      items-center

                      justify-center

                      transition-all

                      duration-300

                      shadow

                      hover:scale-110

                      ${

                        attendance[student.id] === "Absent"

                        ?

                        "bg-red-500 text-white"

                        :

                        "bg-red-100 text-red-600 hover:bg-red-500 hover:text-white"

                      }

                      `}

                    >

                      <XCircle size={24}/>

                    </button>

                  </td>

                </motion.tr>

              ))

            }

          </tbody>

        </table>

      </div>

    </div>

  );

}

export default Attendance;