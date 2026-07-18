import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ClipboardList,
  Plus,
  BookOpen,
  Clock3,
  CheckCircle2,
} from "lucide-react";

import { getCourseAssignments } from "../../../services/assignmentService";

import AddAssignmentModal from "../../../components/teacherAssignments/AddAssignmentModal";
import AssignmentList from "../../../components/teacherAssignments/AssignmentList";

function Assignments() {

  const { id } = useParams();

  const [assignments, setAssignments] = useState([]);

  const [loading, setLoading] = useState(true);

  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {

    loadAssignments();

  }, []);

  const loadAssignments = async () => {

    try {

      const data = await getCourseAssignments(id);

      setAssignments(data);

    }

    catch (error) {

      console.log(error);

    }

    finally {

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

  return (

    <div className="space-y-8">

      {/* Header */}

      <motion.div

        initial={{ opacity: 0, y: -20 }}

        animate={{ opacity: 1, y: 0 }}

        className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-5"

      >

        <div>

          <h1 className="text-4xl font-bold text-gray-800 flex items-center gap-3">

            <ClipboardList className="text-orange-500"/>

            Assignments

          </h1>

          <p className="text-gray-500 mt-2">

            Create and manage course assignments.

          </p>

        </div>

        <button

          onClick={() => setShowAddModal(true)}

          className="

          flex

          items-center

          gap-2

          bg-gradient-to-r

          from-blue-600

          to-cyan-500

          hover:shadow-xl

          text-white

          px-6

          py-3

          rounded-2xl

          font-semibold

          transition

          "

        >

          <Plus size={20}/>

          Create Assignment

        </button>

      </motion.div>

     {/* Stats */}

<div className="grid md:grid-cols-3 gap-6">

  {/* Total Assignments */}

  <motion.div
    whileHover={{ y: -5 }}
    className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-3xl shadow-xl p-6 text-white"
  >

    <div className="flex justify-between items-center">

      <div>

        <p className="text-blue-100">
          Total Assignments
        </p>

        <h2 className="text-5xl font-bold mt-2">
          {assignments.length}
        </h2>

        <p className="mt-3 text-blue-100">
          Course Assignments
        </p>

      </div>

      <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center">

        <BookOpen size={34} />

      </div>

    </div>

  </motion.div>

  {/* Pending */}

  <motion.div
    whileHover={{ y: -5 }}
    className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-3xl shadow-xl p-6 text-white"
  >

    <div className="flex justify-between items-center">

      <div>

        <p className="text-orange-100">
          Pending
        </p>

        <h2 className="text-5xl font-bold mt-2">

          {
            assignments.filter(
              item => item.status === "Pending"
            ).length
          }

        </h2>

        <p className="mt-3 text-orange-100">
          Awaiting Submission
        </p>

      </div>

      <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center">

        <Clock3 size={34} />

      </div>

    </div>

  </motion.div>

  {/* Completed */}

  <motion.div
    whileHover={{ y: -5 }}
    className="bg-gradient-to-r from-green-600 to-emerald-500 rounded-3xl shadow-xl p-6 text-white"
  >

    <div className="flex justify-between items-center">

      <div>

        <p className="text-green-100">
          Completed
        </p>

        <h2 className="text-5xl font-bold mt-2">

          {
            assignments.filter(
              item => item.status === "Completed"
            ).length
          }

        </h2>

        <p className="mt-3 text-green-100">
          Successfully Finished
        </p>

      </div>

      <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center">

        <CheckCircle2 size={34} />

      </div>

    </div>

  </motion.div>

</div>

      {/* Assignment List */}

      <div className="bg-white rounded-3xl shadow-xl p-6">

        <AssignmentList

          assignments={assignments}

          refresh={loadAssignments}

        />

      </div>

      {

        showAddModal &&

        <AddAssignmentModal

          courseId={id}

          onClose={() => setShowAddModal(false)}

          onSuccess={() => {

            loadAssignments();

            setShowAddModal(false);

          }}

        />

      }

    </div>

  );

}

export default Assignments;