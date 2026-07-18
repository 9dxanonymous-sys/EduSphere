import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";

import { getDashboardCounts } from "../../services/adminService";

import WelcomeBanner from "../../components/adminDashboard/WelcomeBanner";
import StatsCards from "../../components/adminDashboard/StatsCards";
import SystemStatus from "../../components/adminDashboard/SystemStatus";
import AdminProfile from "../../components/adminDashboard/AdminProfile";
import ProgressCards from "../../components/adminDashboard/ProgressCards";
import MiniCalendar from "../../components/adminDashboard/MiniCalendar";
import NotificationPanel from "../../components/adminDashboard/NotificationPanel";
import PendingTasks from "../../components/adminDashboard/PendingTasks";
import Announcements from "../../components/adminDashboard/Announcements";


function AdminDashboard() {


  const user = JSON.parse(localStorage.getItem("user"));


  const [counts,setCounts] = useState({

    total_students:0,
    total_teachers:0,
    total_courses:0,

  });



  useEffect(()=>{

    loadDashboard();

  },[]);



  const loadDashboard = async()=>{

    try{

      const data = await getDashboardCounts();


      setCounts({

        total_students:data.total_students || 0,

        total_teachers:data.total_teachers || 0,

        total_courses:data.total_courses || 0,

      });


    }
    catch(error){

      console.log(error);

    }

  };



  return (

    <DashboardLayout>


      <div className="space-y-8">


        {/* Welcome Section */}

        <WelcomeBanner

          username={user?.username}

        />



        {/* Main Statistics */}

        <StatsCards

          counts={counts}

        />



        {/* System + Profile */}

        <div className="grid lg:grid-cols-2 gap-8">


          <SystemStatus />


          <AdminProfile

            user={user}

          />


        </div>





        {/* Progress + Calendar */}


        <div className="grid lg:grid-cols-2 gap-8">


          <ProgressCards

            counts={counts}

          />


          <MiniCalendar />


        </div>





        {/* Tasks + Notifications */}


        <div className="grid lg:grid-cols-2 gap-8">


          <PendingTasks />


          <NotificationPanel />


        </div>





        {/* Announcements */}


        <Announcements />



      </div>


    </DashboardLayout>

  );

}


export default AdminDashboard;