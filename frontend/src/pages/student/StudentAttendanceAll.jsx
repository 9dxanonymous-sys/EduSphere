import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  CalendarCheck2,
  CheckCircle2,
  XCircle,
  Percent,
} from "lucide-react";

import { getMyAttendance } from "../../services/attendanceService";
import { getMyEnrolledCourses } from "../../services/studentService";

function Attendance() {

  const [records, setRecords] = useState([]);
  const [courseMap, setCourseMap] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {

    try {

      const [attendanceData, coursesData] = await Promise.all([
        getMyAttendance(),
        getMyEnrolledCourses(),
      ]);

      const map = {};

      (coursesData.courses || []).forEach((c) => {
        map[c.id] = `${c.course_code} - ${c.course_name}`;
      });

      setCourseMap(map);
      setRecords(Array.isArray(attendanceData) ? attendanceData : []);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  if (loading) {

    return (
      <div className="flex justify-center items-center h-72">
        <h2 className="text-xl font-semibold text-gray-500">
          Loading Attendance...
        </h2>
      </div>
    );

  }

  const presentCount = records.filter((r) => r.present).length;
  const absentCount = records.filter((r) => !r.present).length;

  const percentage =
    records.length === 0
      ? 0
      : Math.round((presentCount / records.length) * 100);

  // Group by course

  const grouped = {};

  records.forEach((r) => {

    if (!grouped[r.course_id]) {
      grouped[r.course_id] = [];
    }

    grouped[r.course_id].push(r);

  });

  const courseSummaries = Object.keys(grouped).map((courseId) => {

    const items = grouped[courseId];
    const present = items.filter((i) => i.present).length;

    return {
      courseId,
      courseName: courseMap[courseId] || `Course #${courseId}`,
      total: items.length,
      present,
      absent: items.length - present,
      percentage: Math.round((present / items.length) * 100),
    };

  });

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
          Your attendance across all enrolled courses.
        </p>

      </motion.div>

      {/* Overall Stats */}

      <div className="grid md:grid-cols-3 gap-6">

        <motion.div
          whileHover={{ y: -5 }}
          className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-3xl shadow-xl p-6 text-white"
        >
          <div className="flex justify-between items-center">
            <div>
              <p className="text-blue-100">Overall Percentage</p>
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

      {/* Per-Course Breakdown */}

      {

        courseSummaries.length === 0 ? (

          <div className="bg-white rounded-3xl shadow-lg p-16 text-center text-gray-500">
            No Attendance Records Found
          </div>

        ) : (

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

            {

              courseSummaries.map((summary) => (

                <motion.div
                  key={summary.courseId}
                  whileHover={{ y: -4 }}
                  className="bg-white rounded-3xl shadow-xl p-6"
                >

                  <h3 className="font-bold text-lg text-gray-800">
                    {summary.courseName}
                  </h3>

                  <div className="mt-4 flex items-center justify-between">

                    <span className="text-3xl font-bold text-blue-600">
                      {summary.percentage}%
                    </span>

                    <span className="text-sm text-gray-500">
                      {summary.present}/{summary.total} classes
                    </span>

                  </div>

                  <div className="mt-4 h-2 rounded-full bg-gray-100 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
                      style={{ width: `${summary.percentage}%` }}
                    />
                  </div>

                </motion.div>

              ))

            }

          </div>

        )

      }

      {/* History Table */}

      <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

        <table className="w-full">

          <thead className="bg-slate-900 text-white">
            <tr>
              <th className="px-6 py-4 text-left">Course</th>
              <th className="px-6 py-4 text-left">Date</th>
              <th className="px-6 py-4 text-center">Status</th>
            </tr>
          </thead>

          <tbody>

            {

              records.length === 0 ? (

                <tr>
                  <td colSpan="3" className="text-center py-14 text-gray-500">
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
                        {courseMap[record.course_id] || `Course #${record.course_id}`}
                      </td>

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