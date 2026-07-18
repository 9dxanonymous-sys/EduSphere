import { useState } from "react";
import { CalendarDays, FileText, CheckCircle2 } from "lucide-react";

import SubmitAssignmentModal from "./SubmitAssignmentModal";

function AssignmentCard({ assignment, submission, refresh }) {

  const [showSubmit, setShowSubmit] = useState(false);

  const isSubmitted = !!submission;
  const isGraded = isSubmitted && submission.marks > 0;

  return (

    <>

      <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">

        <div className="flex justify-between items-start">

          <div>

            <h2 className="text-2xl font-bold text-gray-800">
              {assignment.title}
            </h2>

            <div className="flex items-center gap-2 text-gray-500 mt-2">
              <CalendarDays size={18} />
              <span>Due: {assignment.due_date}</span>
            </div>

          </div>

          <FileText size={34} className="text-blue-600" />

        </div>

        <p className="mt-5 text-gray-600 whitespace-pre-line">
          {assignment.description}
        </p>

        {

          isSubmitted && (

            <div className="mt-5 bg-green-50 rounded-xl p-4">

              <p className="text-green-700 font-semibold flex items-center gap-2">
                <CheckCircle2 size={18} />
                Submitted
              </p>

              {

                isGraded && (

                  <p className="text-gray-600 mt-2 text-sm">
                    Marks: {submission.marks} &nbsp;|&nbsp; Feedback: {submission.feedback || "—"}
                  </p>

                )

              }

            </div>

          )

        }

        <div className="flex justify-end mt-6">

          {

            !isSubmitted && (

              <button
                onClick={() => setShowSubmit(true)}
                className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 hover:shadow-xl text-white px-5 py-2.5 rounded-xl font-semibold transition"
              >
                Submit Assignment
              </button>

            )

          }

        </div>

      </div>

      {

        showSubmit && (

          <SubmitAssignmentModal
            assignment={assignment}
            onClose={() => setShowSubmit(false)}
            onSuccess={() => {
              refresh();
              setShowSubmit(false);
            }}
          />

        )

      }

    </>

  );

}

export default AssignmentCard;