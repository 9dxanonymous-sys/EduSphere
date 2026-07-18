import { useEffect, useState } from "react";

import TeacherHeader from "../../components/teacherDashboard/TeacherHeader";
import TeacherStats from "../../components/teacherDashboard/TeacherStats";
import TeacherProgressCards from "../../components/teacherDashboard/TeacherProgressCards";
import TeacherDashboardProfile from "../../components/teacherDashboard/TeacherDashboardProfile";
import TeacherMiniCalendar from "../../components/teacherDashboard/TeacherMiniCalendar";
import TeacherNotificationPanel from "../../components/teacherDashboard/TeacherNotificationPanel";
import TeacherPendingTasks from "../../components/teacherDashboard/TeacherPendingTasks";
import TeacherAnnouncements from "../../components/teacherDashboard/TeacherAnnouncements";

import {
  getTeacherDashboardStats,
} from "../../services/teacherService";

function TeacherDashboard() {

  const user = JSON.parse(localStorage.getItem("user"));

  const [stats, setStats] = useState({
    courses: 0,
    students: 0,
    assignments: 0,
    announcements: 0,
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {

    try {

      const data = await getTeacherDashboardStats();

      setStats(data);

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div className="space-y-8">

      <TeacherHeader />

      <TeacherStats stats={stats} />

      <div className="grid lg:grid-cols-3 gap-8">

        <div className="lg:col-span-2">

          <TeacherProgressCards stats={stats} />

        </div>

        <TeacherDashboardProfile user={user} />

      </div>

      <div className="grid lg:grid-cols-2 gap-8">

        <TeacherMiniCalendar />

        <TeacherNotificationPanel />

      </div>

      <div className="grid lg:grid-cols-2 gap-8">

        <TeacherPendingTasks />

        <TeacherAnnouncements />

      </div>

    </div>

  );

}

export default TeacherDashboard;