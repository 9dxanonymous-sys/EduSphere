import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GraduationCap } from "lucide-react";

import { getMyResult } from "../../../services/resultService";
import ResultCard from "../../../components/studentGrades/ResultCard";

function Grades() {

  const { id } = useParams();

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadResult();
  }, []);

  const loadResult = async () => {

    try {

      const data = await getMyResult();

      const courseResult = (data || []).find(
        (r) => r.course_id === Number(id)
      );

      setResult(courseResult || null);

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
          Loading Grades...
        </h2>
      </div>
    );

  }

  return (

    <div>

      <div className="mb-8">

        <h1 className="text-3xl font-bold flex items-center gap-3">
          <GraduationCap className="text-purple-600"/>
          Course Grades
        </h1>

        <p className="text-gray-500 mt-2">
          Your result for this course.
        </p>

      </div>

      {

        result ? (

          <ResultCard result={result} />

        ) : (

          <div className="bg-white rounded-2xl shadow p-10 text-center text-gray-500">
            No Result Available Yet
          </div>

        )

      }

    </div>

  );

}

export default Grades;