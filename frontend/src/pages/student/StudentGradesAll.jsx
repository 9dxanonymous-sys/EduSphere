import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  GraduationCap,
  Award,
  Download,
  BookOpen,
} from "lucide-react";

import { getMyEnrolledCourses } from "../../services/studentService";
import {
  getMyResult,
  getMyCGPA,
  downloadMyTranscriptPdf,
} from "../../services/resultService";

import ResultCard from "../../components/studentGrades/ResultCard";

function Grades() {

  const [results, setResults] = useState([]);
  const [cgpa, setCgpa] = useState(0);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {

    try {

      const [resultData, coursesData, cgpaData] = await Promise.all([
        getMyResult(),
        getMyEnrolledCourses(),
        getMyCGPA(),
      ]);

      const courseMap = {};

      (coursesData.courses || []).forEach((c) => {
        courseMap[c.id] = `${c.course_code} - ${c.course_name}`;
      });

      const enriched = (Array.isArray(resultData) ? resultData : []).map(
        (r) => ({
          ...r,
          course_name: courseMap[r.course_id] || `Course #${r.course_id}`,
        })
      );

      setResults(enriched);
      setCgpa(cgpaData?.cgpa || 0);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  const handleDownload = async () => {

    try {

      setDownloading(true);
      await downloadMyTranscriptPdf();

    } catch (error) {

      console.log(error);
      alert("Failed to download transcript");

    } finally {

      setDownloading(false);

    }

  };

  if (loading) {

    return (
      <div className="flex justify-center items-center h-72">
        <h2 className="text-xl font-semibold text-gray-500">
          Loading Grades...
        </h2>
      </div>
    );

  }

  return (

    <div className="space-y-8">

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-5"
      >

        <div>

          <h1 className="text-4xl font-bold flex items-center gap-3">
            <GraduationCap className="text-purple-600"/>
            My Grades
          </h1>

          <p className="text-gray-500 mt-2">
            Your results across all enrolled courses.
          </p>

        </div>

        <button
          onClick={handleDownload}
          disabled={downloading}
          className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-6 py-3 rounded-2xl font-semibold hover:shadow-xl transition disabled:opacity-50"
        >
          <Download size={18} />
          {downloading ? "Downloading..." : "Download Transcript"}
        </button>

      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">

        <motion.div
          whileHover={{ y: -5 }}
          className="bg-gradient-to-r from-purple-600 to-fuchsia-500 rounded-3xl shadow-xl p-6 text-white"
        >
          <div className="flex justify-between items-center">
            <div>
              <p className="text-purple-100">CGPA</p>
              <h2 className="text-5xl font-bold mt-2">{cgpa}</h2>
            </div>
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center">
              <Award size={34} />
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -5 }}
          className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-3xl shadow-xl p-6 text-white"
        >
          <div className="flex justify-between items-center">
            <div>
              <p className="text-blue-100">Graded Courses</p>
              <h2 className="text-5xl font-bold mt-2">{results.length}</h2>
            </div>
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center">
              <BookOpen size={34} />
            </div>
          </div>
        </motion.div>

      </div>

      {

        results.length === 0 ? (

          <div className="bg-white rounded-3xl shadow-lg p-16 text-center text-gray-500">
            No Results Available Yet
          </div>

        ) : (

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

            {

              results.map((result) => (

                <ResultCard key={result.id} result={result} />

              ))

            }

          </div>

        )

      }

    </div>

  );

}

export default Grades;