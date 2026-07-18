import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";

import ReportHeader from "../../components/reports/ReportHeader";
import SummaryCards from "../../components/reports/SummaryCards";
import CourseTable from "../../components/reports/CourseTable";
import TeacherTable from "../../components/reports/TeacherTable";
import StudentTable from "../../components/reports/StudentTable";
import DetailModal from "../../components/reports/DetailModal";

import {
  getSummary,
  getCourseReports,
  getTeacherReports,
  getStudentReports,
  getCourseDetails,
  getTeacherDetails,
  getStudentDetails,
} from "../../services/reportService";

function Reports() {

  const [summary, setSummary] = useState({});
  const [courses, setCourses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [open, setOpen] = useState(false);
  const [type, setType] = useState("");
  const [detail, setDetail] = useState({});
  const [title, setTitle] = useState("");

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
    try {

      setLoading(true);

      const [
        summaryData,
        courseData,
        teacherData,
        studentData,
      ] = await Promise.all([
        getSummary(),
        getCourseReports(),
        getTeacherReports(),
        getStudentReports(),
      ]);

      setSummary(summaryData);
      setCourses(courseData);
      setTeachers(teacherData);
      setStudents(studentData);

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);

    }
  };

  const openDetail = async (id, reportType) => {

    try {

      let data;

      if (reportType === "course") {

        data = await getCourseDetails(id);

        setTitle("Course Details");

      }

      if (reportType === "teacher") {

        data = await getTeacherDetails(id);

        setTitle("Teacher Details");

      }

      if (reportType === "student") {

        data = await getStudentDetails(id);

        setTitle("Student Details");

      }

      setDetail(data);
      setType(reportType);
      setOpen(true);

    } catch (err) {

      console.log(err);

    }

  };

  const filteredCourses = courses.filter(course =>
    course.course_name.toLowerCase().includes(search.toLowerCase())
  );

  const filteredTeachers = teachers.filter(teacher =>
    teacher.teacher.toLowerCase().includes(search.toLowerCase())
  );

  const filteredStudents = students.filter(student =>
    student.student.toLowerCase().includes(search.toLowerCase())
  );
    return (
    <DashboardLayout>

      <ReportHeader onRefresh={loadReports} />

      <div className="mb-8">

        <input
          type="text"
          placeholder="Search Course, Teacher or Student..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white rounded-xl border border-gray-200 shadow-sm px-5 py-4 outline-none focus:ring-2 focus:ring-blue-500"
        />

      </div>

      <SummaryCards summary={summary} />

      {loading ? (

        <div className="bg-white rounded-2xl shadow-lg p-12 text-center">

          <div className="animate-spin rounded-full h-14 w-14 border-4 border-blue-600 border-t-transparent mx-auto"></div>

          <p className="mt-5 text-gray-500 text-lg">
            Loading Reports...
          </p>

        </div>

      ) : (

        <>

          <CourseTable
            courses={filteredCourses}
            onView={openDetail}
          />

          <TeacherTable
            teachers={filteredTeachers}
            onView={openDetail}
          />

          <StudentTable
            students={filteredStudents}
            onView={openDetail}
          />

        </>

      )}

      <DetailModal
        open={open}
        onClose={() => setOpen(false)}
        title={title}
        data={detail}
        type={type}
      />

    </DashboardLayout>
  );

}

export default Reports;