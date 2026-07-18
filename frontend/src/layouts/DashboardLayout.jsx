import { useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";

function DashboardLayout({ children }) {

  const [collapsed, setCollapsed] = useState(false);

  return (

    <div className="flex bg-gray-100 min-h-screen">

      <Sidebar

        collapsed={collapsed}
        setCollapsed={setCollapsed}

      />

      <div
        className={`flex-1 transition-all duration-300 ${
          collapsed ? "ml-20" : "ml-64"
        }`}
      >

        <Navbar />

        <div className="p-6">

          {children}

        </div>

      </div>

    </div>

  );

}

export default DashboardLayout;