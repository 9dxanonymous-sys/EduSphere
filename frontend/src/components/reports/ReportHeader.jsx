import { motion } from "framer-motion";
import {
  FileText,
  Download,
  Printer,
  RefreshCw,
} from "lucide-react";

function ReportHeader({ onRefresh }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -25 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8"
    >
      <div className="bg-gradient-to-r from-indigo-700 via-blue-600 to-cyan-500 rounded-3xl shadow-xl p-8 text-white">

        <div className="flex flex-col lg:flex-row justify-between items-center">

          <div>

            <div className="flex items-center gap-3">

              <div className="bg-white/20 p-3 rounded-xl">

                <FileText size={32} />

              </div>

              <div>

                <h1 className="text-4xl font-bold">
                  Reports Dashboard
                </h1>

                <p className="text-blue-100 mt-2">
                  View university statistics, teachers,
                  students and courses.
                </p>

              </div>

            </div>

          </div>

          <div className="flex gap-3 mt-6 lg:mt-0">

            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-5 py-3 rounded-xl transition"
            >
              <Printer size={18} />
              Print
            </button>

            <button
              className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-5 py-3 rounded-xl transition"
            >
              <Download size={18} />
              Export
            </button>

            <button
              onClick={onRefresh}
              className="flex items-center gap-2 bg-white text-blue-700 font-semibold px-5 py-3 rounded-xl hover:bg-gray-100 transition"
            >
              <RefreshCw size={18} />
              Refresh
            </button>

          </div>

        </div>

      </div>
    </motion.div>
  );
}

export default ReportHeader;