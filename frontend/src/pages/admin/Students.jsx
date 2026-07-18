import { useEffect, useMemo, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";

import { getStudents } from "../../services/studentService";

import StudentHeader from "../../components/students/StudentHeader";
import StudentStats from "../../components/students/StudentStats";
import StudentToolbar from "../../components/students/StudentToolbar";
import StudentTable from "../../components/students/StudentTable";

import AddStudentModal from "../../components/students/AddStudentModal";
import EditStudentModal from "../../components/students/EditStudentModal";
import DeleteStudentModal from "../../components/students/DeleteStudentModal";
import EnrollCourseModal from "../../components/students/EnrollCourseModal";
import StudentCoursesModal from "../../components/students/StudentCoursesModal";

function Students() {

  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("");
  const [semester, setSemester] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showEnroll, setShowEnroll] = useState(false);
  const [showCourses, setShowCourses] = useState(false);

  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {

    try {

      setLoading(true);

      const data = await getStudents();

      setStudents(data);

    } catch (error) {

      console.log(error);
      alert("Failed to load students");

    } finally {

      setLoading(false);

    }

  };

  const departments = useMemo(() => {

    return [...new Set(students.map((s) => s.department))];

  }, [students]);

  useEffect(() => {

    let data = [...students];

    if (search.trim()) {

      data = data.filter((student) =>
        student.full_name.toLowerCase().includes(search.toLowerCase()) ||
        student.email.toLowerCase().includes(search.toLowerCase()) ||
        student.department.toLowerCase().includes(search.toLowerCase())
      );

    }

    if (department) {

      data = data.filter(
        (student) => student.department === department
      );

    }

    if (semester) {

      data = data.filter(
        (student) =>
          String(student.semester) === String(semester)
      );

    }

    setFilteredStudents(data);

  }, [students, search, department, semester]);
    return (

    <DashboardLayout>

      {/* Header */}

      <StudentHeader
        onAdd={() => setShowModal(true)}
      />

      {/* Statistics */}

      <StudentStats
        students={students}
      />

      {/* Toolbar */}

      <StudentToolbar
        search={search}
        setSearch={setSearch}
        department={department}
        setDepartment={setDepartment}
        semester={semester}
        setSemester={setSemester}
        departments={departments}
        onRefresh={loadStudents}
      />

      {/* Loading */}

      {loading ? (

        <div className="bg-white rounded-2xl shadow-lg p-12">

          <div className="flex flex-col items-center">

            <div className="animate-spin rounded-full h-14 w-14 border-4 border-blue-600 border-t-transparent"></div>

            <p className="mt-5 text-gray-500 text-lg">

              Loading Students...

            </p>

          </div>

        </div>

      ) : (

        <StudentTable

          students={filteredStudents}

          onEdit={(student) => {
            setSelectedStudent(student);
            setShowEdit(true);
          }}

          onDelete={(student) => {
            setSelectedStudent(student);
            setShowDelete(true);
          }}

          onEnroll={(student) => {
            setSelectedStudent(student);
            setShowEnroll(true);
          }}

          onCourses={(student) => {
            setSelectedStudent(student);
            setShowCourses(true);
          }}

          onView={(student) => {
            setSelectedStudent(student);
            setShowCourses(true);
          }}

        />

      )}

      {/* Add Student */}

      {showModal && (

        <AddStudentModal
          onClose={() => setShowModal(false)}
          onSuccess={loadStudents}
        />

      )}

      {/* Edit Student */}

      {showEdit && (

        <EditStudentModal
          student={selectedStudent}
          onClose={() => setShowEdit(false)}
          onSuccess={loadStudents}
        />

      )}

      {/* Delete Student */}

      {showDelete && (

        <DeleteStudentModal
          student={selectedStudent}
          onClose={() => setShowDelete(false)}
          onSuccess={loadStudents}
        />

      )}

      {/* Enroll Course */}

      {showEnroll && (

        <EnrollCourseModal
          student={selectedStudent}
          onClose={() => setShowEnroll(false)}
        />

      )}

      {/* View Courses */}

      {showCourses && (

        <StudentCoursesModal
          student={selectedStudent}
          onClose={() => setShowCourses(false)}
        />

      )}

    </DashboardLayout>

  );

}

export default Students;