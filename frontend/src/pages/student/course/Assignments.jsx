import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ClipboardList,
  BookOpen,
  Clock3,
  CheckCircle2,
} from "lucide-react";

import {
  getMyCourseAssignments,
  getMySubmissions,
} from "../../../services/assignmentService";

import AssignmentList from "../../../components/studentAssignments/AssignmentList";

function Assignments() {

  const { id } = useParams();

  const [assignments, setAssignments] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {

    try {

      const [assignmentData, submissionData] = await Promise.all([
        getMyCourseAssignments(id),
        getMySubmissions(),
      ]);

      setAssignments(Array.isArray(assignmentData) ? assignmentData : []);
      setSubmissions(Array.isArray(submissionData) ? submissionData : []);

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
          Loading Assignments...
        </h2>
      </div>
    );

  }

  const submittedCount = assignments.filter((a) =>
    submissions.some((s) => s.assignment_id === a.id)
  ).length;

  const pendingCount = assignments.length - submittedCount;

  return (

    <div className="space-y-8">

      <motion.div

        initial={{ opacity: 0, y: -20 }}

        animate={{ opacity: 1, y: 0 }}

      >

        <h1 className="text-4xl font-bold text-gray-800 flex items-center gap-3">
          <ClipboardList className="text-orange-500"/>
          Assignments
        </h1>

        <p className="text-gray-500 mt-2">
          View and submit your course assignments.
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
              <p className="text-blue-100">Total Assignments</p>
              <h2 className="text-5xl font-bold mt-2">{assignments.length}</h2>
            </div>

            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center">
              <BookOpen size={34} />
            </div>

          </div>

        </motion.div>

        <motion.div
          whileHover={{ y: -5 }}
          className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-3xl shadow-xl p-6 text-white"
        >

          <div className="flex justify-between items-center">

            <div>
              <p className="text-orange-100">Pending</p>
              <h2 className="text-5xl font-bold mt-2">{pendingCount}</h2>
            </div>

            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center">
              <Clock3 size={34} />
            </div>

          </div>

        </motion.div>

        <motion.div
          whileHover={{ y: -5 }}
          className="bg-gradient-to-r from-green-600 to-emerald-500 rounded-3xl shadow-xl p-6 text-white"
        >

          <div className="flex justify-between items-center">

            <div>
              <p className="text-green-100">Submitted</p>
              <h2 className="text-5xl font-bold mt-2">{submittedCount}</h2>
            </div>

            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center">
              <CheckCircle2 size={34} />
            </div>

          </div>

        </motion.div>

      </div>

      <div className="bg-white rounded-3xl shadow-xl p-6">

        <AssignmentList
          assignments={assignments}
          submissions={submissions}
          refresh={loadData}
        />

      </div>

    </div>

  );

}

export default Assignments;