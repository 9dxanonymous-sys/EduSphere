import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  CalendarCheck2,
  CheckCircle2,
  XCircle,
  Percent,
} from "lucide-react";

import { getMyAttendance } from "../../../services/attendanceService";

function Attendance() {

  const { id } = useParams();

  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAttendance();
  }, []);

  const loadAttendance = async () => {

    try {

      const data = await getMyAttendance();

      const filtered = (data || []).filter(
        (item) => item.course_id === Number(id)
      );

      setRecords(filtered);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  const presentCount = records.filter((r) => r.present).length;
  const absentCount = records.filter((r) => !r.present).length;

  const percentage = useMemo(() => {

    if (records.length === 0) return 0;

    return Math.round((presentCount / records.length) * 100);

  }, [records, presentCount]);

  if (loading) {

    return (
      <div className="flex justify-center items-center h-64">
        <h2 className="text-xl">Loading Attendance...</h2>
      </div>
    );

  }

  return (

    <div className="space-y-8">

      <motion.div

        initial={{ opacity: 0, y: -20 }}

        animate={{ opacity: 1, y: 0 }}

      >

        <h1 className="text-4xl font-bold flex items-center gap-3">
          <CalendarCheck2 className="text-green-600" />
          My Attendance
        </h1>

        <p className="text-gray-500 mt-2">
          Your attendance record for this course.
        </p>

      </motion.div>

      {/* Stats */}

      <div className="grid md:grid-cols-3 gap-6">

        <motion.div
          whileHover={{ y: -5 }}
          className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-3xl shadow-xl p-6 text-white"
        >

          <div className="flex justify-between items-center">

            <div>
              <p className="text-blue-100">Percentage</p>
              <h2 className="text-5xl font-bold mt-2">{percentage}%</h2>
            </div>

            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center">
              <Percent size={34} />
            </div>

          </div>

        </motion.div>

        <motion.div
          whileHover={{ y: -5 }}
          className="bg-gradient-to-r from-green-600 to-emerald-500 rounded-3xl shadow-xl p-6 text-white"
        >

          <div className="flex justify-between items-center">

            <div>
              <p className="text-green-100">Present</p>
              <h2 className="text-5xl font-bold mt-2">{presentCount}</h2>
            </div>

            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center">
              <CheckCircle2 size={34} />
            </div>

          </div>

        </motion.div>

        <motion.div
          whileHover={{ y: -5 }}
          className="bg-gradient-to-r from-red-600 to-rose-500 rounded-3xl shadow-xl p-6 text-white"
        >

          <div className="flex justify-between items-center">

            <div>
              <p className="text-red-100">Absent</p>
              <h2 className="text-5xl font-bold mt-2">{absentCount}</h2>
            </div>

            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center">
              <XCircle size={34} />
            </div>

          </div>

        </motion.div>

      </div>

      {/* Records */}

      <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

        <table className="w-full">

          <thead className="bg-slate-900 text-white">

            <tr>
              <th className="px-6 py-4 text-left">Date</th>
              <th className="px-6 py-4 text-center">Status</th>
            </tr>

          </thead>

          <tbody>

            {

              records.length === 0 ? (

                <tr>
                  <td colSpan="2" className="text-center py-14 text-gray-500">
                    No Attendance Records Found
                  </td>
                </tr>

              ) : (

                records
                  .slice()
                  .sort((a, b) => new Date(b.attendance_date) - new Date(a.attendance_date))
                  .map((record) => (

                    <tr key={record.id} className="border-b">

                      <td className="px-6 py-4">
                        {new Date(record.attendance_date).toLocaleDateString()}
                      </td>

                      <td className="text-center py-4">

                        <span
                          className={`px-4 py-1.5 rounded-full text-sm font-semibold ${
                            record.present
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {record.present ? "Present" : "Absent"}
                        </span>

                      </td>

                    </tr>

                  ))

              )

            }

          </tbody>

        </table>

      </div>

    </div>

  );

}

export default Attendance;