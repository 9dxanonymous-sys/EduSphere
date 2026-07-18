import { useState } from "react";
import { Outlet } from "react-router-dom";

import StudentSidebar from "../components/studentDashboard/StudentSidebar";
import StudentNavbar from "../components/studentDashboard/StudentNavbar";

function StudentLayout() {

  const [collapsed, setCollapsed] = useState(false);

  return (

    <div className="flex bg-slate-100 min-h-screen">

      <StudentSidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      <div
        className={`flex-1 transition-all duration-300 ${
          collapsed ? "ml-20" : "ml-64"
        }`}
      >

        <StudentNavbar />

        <div className="p-8">

          <Outlet />

        </div>

      </div>

    </div>

  );

}

export default StudentLayout;