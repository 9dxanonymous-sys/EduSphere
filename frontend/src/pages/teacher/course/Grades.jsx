import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GraduationCap } from "lucide-react";

import {
  getCourseResults,
} from "../../../services/resultService";

import {
  getCourseStudents,
} from "../../../services/teacherService";

import ResultList from "../../../components/teacherGrades/ResultList";
import AddResultModal from "../../../components/teacherGrades/AddResultModal";
import EditResultModal from "../../../components/teacherGrades/EditResultModal";
import DeleteResultModal from "../../../components/teacherGrades/DeleteResultModal";

function Grades() {

  const { id } = useParams();

  const [results, setResults] = useState([]);
  const [students, setStudents] = useState([]);

  const [showAdd, setShowAdd] = useState(false);
  const [editResult, setEditResult] = useState(null);
  const [deleteResult, setDeleteResult] = useState(null);

  useEffect(() => {

    loadResults();
    loadStudents();

  }, []);

  const loadResults = async () => {

    try {

      const data = await getCourseResults(id);

      setResults(data);

    } catch (error) {

      console.log(error);

    }

  };

  const loadStudents = async () => {

    try {

      const data = await getCourseStudents(id);

      setStudents(data);

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div>

      <div className="flex justify-between items-center mb-8">

        <div>

          <h1 className="text-3xl font-bold flex items-center gap-3">

            <GraduationCap className="text-purple-600"/>

            Course Results

          </h1>

          <p className="text-gray-500 mt-2">

            Total Results : {results.length}

          </p>

        </div>

        <button

          onClick={() => setShowAdd(true)}

          className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-3 rounded-xl"

        >

          + Add Result

        </button>

      </div>

      <ResultList

        results={results}

        onEdit={setEditResult}

        onDelete={setDeleteResult}

      />

      {

        showAdd &&

        <AddResultModal

          courseId={id}

          students={students}

          onClose={() => setShowAdd(false)}

          onSuccess={loadResults}

        />

      }

      {

        editResult &&

        <EditResultModal

          result={editResult}

          onClose={() => setEditResult(null)}

          onSuccess={loadResults}

        />

      }

      {

        deleteResult &&

        <DeleteResultModal

          result={deleteResult}

          onClose={() => setDeleteResult(null)}

          onSuccess={loadResults}

        />

      }

    </div>

  );

}

export default Grades;