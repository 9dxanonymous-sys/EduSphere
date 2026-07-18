import { useState } from "react";
import { Outlet } from "react-router-dom";

import TeacherSidebar from "../components/teacherDashboard/TeacherSidebar";
import TeacherNavbar from "../components/teacherDashboard/TeacherNavbar";

function TeacherLayout() {

  const [collapsed, setCollapsed] = useState(false);

  return (

    <div className="flex bg-slate-100 min-h-screen">

      <TeacherSidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      <div
        className={`flex-1 transition-all duration-300 ${
          collapsed ? "ml-20" : "ml-64"
        }`}
      >

        <TeacherNavbar />

        <div className="p-8">

          <Outlet />

        </div>

      </div>

    </div>

  );

}

export default TeacherLayout;