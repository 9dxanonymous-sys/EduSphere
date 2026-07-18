import { BrowserRouter, Routes, Route } from "react-router-dom";

// ================= AUTH =================
import Login from "./pages/auth/Login";

// ================= LAYOUTS =================
import TeacherLayout from "./layouts/TeacherLayout";
import StudentLayout from "./layouts/StudentLayout";

// ================= ADMIN =================
import AdminDashboard from "./pages/admin/AdminDashboard";
import Students from "./pages/admin/Students";
import Teachers from "./pages/admin/Teachers";
import Courses from "./pages/admin/Courses";
import Users from "./pages/admin/Users";
import Reports from "./pages/admin/Reports";
import Settings from "./pages/admin/Settings";

// ================= TEACHER =================
import TeacherDashboard from "./pages/teacher/TeacherDashboard";
import TeacherCourses from "./pages/teacher/TeacherCourses";
import TeacherProfile from "./pages/teacher/TeacherProfile";
import TeacherSettings from "./pages/teacher/TeacherSettings";

import CourseDetail from "./pages/teacher/CourseDetail";
import CourseStudents from "./pages/teacher/course/CourseStudents";
import Attendance from "./pages/teacher/course/Attendance";
import Assignments from "./pages/teacher/course/Assignments";
import Grades from "./pages/teacher/course/Grades";
import Announcements from "./pages/teacher/course/Announcements";

// ================= STUDENT =================
import StudentDashboard from "./pages/student/StudentDashboard";
import StudentCourses from "./pages/student/StudentCourses";
import StudentSettings from "./pages/student/StudentSettings";
import StudentCourseDetail from "./pages/student/CourseDetail";

// Student — All Courses Combined (sidebar direct links)
import StudentAttendanceAll from "./pages/student/StudentAttendanceAll";
import StudentAssignmentsAll from "./pages/student/StudentAssignmentsAll";
import StudentGradesAll from "./pages/student/StudentGradesAll";
import StudentAnnouncementsAll from "./pages/student/StudentAnnouncementsAll";

// Student — Per-Course (from CourseDetail)
import StudentAttendance from "./pages/student/course/Attendance";
import StudentAssignments from "./pages/student/course/Assignments";
import StudentGrades from "./pages/student/course/Grades";
import StudentAnnouncements from "./pages/student/course/Announcements";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ================= AUTH ================= */}

        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />

        {/* ================= ADMIN ================= */}

        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/students" element={<Students />} />
        <Route path="/admin/teachers" element={<Teachers />} />
        <Route path="/admin/courses" element={<Courses />} />
        <Route path="/admin/users" element={<Users />} />
        <Route path="/admin/reports" element={<Reports />} />
        <Route path="/admin/settings" element={<Settings />} />

        {/* ================= TEACHER ================= */}

        <Route path="/teacher" element={<TeacherLayout />}>

          <Route path="dashboard" element={<TeacherDashboard />} />
          <Route path="courses" element={<TeacherCourses />} />
          <Route path="profile" element={<TeacherProfile />} />
          <Route path="settings" element={<TeacherSettings />} />

          <Route path="course/:id" element={<CourseDetail />} />
          <Route path="course/:id/students" element={<CourseStudents />} />
          <Route path="course/:id/attendance" element={<Attendance />} />
          <Route path="course/:id/assignments" element={<Assignments />} />
          <Route path="course/:id/grades" element={<Grades />} />
          <Route path="course/:id/announcements" element={<Announcements />} />

        </Route>

        {/* ================= STUDENT ================= */}

        <Route path="/student" element={<StudentLayout />}>

          <Route path="dashboard" element={<StudentDashboard />} />
          <Route path="courses" element={<StudentCourses />} />
          <Route path="settings" element={<StudentSettings />} />

          {/* Direct sidebar links — all courses combined */}
          <Route path="attendance" element={<StudentAttendanceAll />} />
          <Route path="assignments" element={<StudentAssignmentsAll />} />
          <Route path="grades" element={<StudentGradesAll />} />
          <Route path="announcements" element={<StudentAnnouncementsAll />} />

          {/* Per-course — from CourseDetail */}
          <Route path="course/:id" element={<StudentCourseDetail />} />
          <Route path="course/:id/attendance" element={<StudentAttendance />} />
          <Route path="course/:id/assignments" element={<StudentAssignments />} />
          <Route path="course/:id/grades" element={<StudentGrades />} />
          <Route path="course/:id/announcements" element={<StudentAnnouncements />} />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;