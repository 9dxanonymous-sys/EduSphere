import { useEffect, useState } from "react";

import StudentHeader from "../../components/studentDashboard/StudentHeader";
import StudentStats from "../../components/studentDashboard/StudentStats";
import StudentProgressCards from "../../components/studentDashboard/StudentProgressCards";
import StudentDashboardProfile from "../../components/studentDashboard/StudentDashboardProfile";
import StudentMiniCalendar from "../../components/studentDashboard/StudentMiniCalendar";
import StudentAnnouncementsPanel from "../../components/studentDashboard/StudentAnnouncementsPanel";
import StudentQuickLinks from "../../components/studentDashboard/StudentQuickLinks";

import {
  getMyDashboardStats,
  getMyProfile,
} from "../../services/studentService";

function StudentDashboard() {

  const user = JSON.parse(localStorage.getItem("user"));

  const [stats, setStats] = useState({
    total_courses: 0,
    attendance_percentage: 0,
    pending_assignments: 0,
    cgpa: 0,
  });

  const [profile, setProfile] = useState(null);

  useEffect(() => {
    loadStats();
    loadProfile();
  }, []);

  const loadStats = async () => {

    try {

      const data = await getMyDashboardStats();
      setStats(data);

    } catch (error) {

      console.log(error);

    }

  };

  const loadProfile = async () => {

    try {

      const data = await getMyProfile();
      setProfile(data);

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div className="space-y-8">

      {/* Welcome Banner */}
      <StudentHeader />

      {/* CGPA | Attendance | Courses | Assignments */}
      <StudentStats stats={stats} />

      {/* Student Profile | Mini Calendar */}
      <div className="grid lg:grid-cols-2 gap-8">

        <StudentDashboardProfile user={user} profile={profile} />

        <StudentMiniCalendar />

      </div>

      {/* Academic Progress | Quick Links (Upcoming Deadlines slot) */}
      <div className="grid lg:grid-cols-2 gap-8">

        <StudentProgressCards stats={stats} />

        <StudentQuickLinks />

      </div>

      {/* Recent Announcements */}
      <StudentAnnouncementsPanel />

    </div>

  );

}

export default StudentDashboard;
