import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  LayoutDashboard,
  BookOpen,
  User,
  Settings,
  LogOut,
  GraduationCap,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

function TeacherSidebar({ collapsed, setCollapsed }) {

  const location = useLocation();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const menus = [

    {
      title: "Dashboard",
      path: "/teacher/dashboard",
      icon: LayoutDashboard,
    },

    {
      title: "My Courses",
      path: "/teacher/courses",
      icon: BookOpen,
    },

    {
      title: "Profile",
      path: "/teacher/profile",
      icon: User,
    },

    {
      title: "Settings",
      path: "/teacher/settings",
      icon: Settings,
    },

  ];



  const logout = () => {

    if (!window.confirm("Logout from EduSphere?"))
      return;

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");

  };



  return (

    <aside

      className={`

      fixed

      left-0

      top-0

      h-screen

      bg-white

      border-r

      shadow-xl

      flex

      flex-col

      transition-all

      duration-300

      z-50

      ${collapsed ? "w-20" : "w-64"}

      `}
    >

      {/* Logo */}

      <div className="relative bg-gradient-to-r from-blue-700 via-indigo-600 to-cyan-500 p-6 text-white">

        <button

          onClick={() => setCollapsed(!collapsed)}

          className="absolute -right-4 top-7 bg-white rounded-full shadow-lg p-2 hover:scale-110 transition"

        >

          {

            collapsed ?

              <ChevronRight
                size={18}
                className="text-blue-700"
              />

              :

              <ChevronLeft
                size={18}
                className="text-blue-700"
              />

          }

        </button>

        {

          !collapsed && (

            <>

              <h1 className="text-3xl font-bold">

                EduSphere

              </h1>

              <p className="text-blue-100 text-sm mt-2">

                Teacher Panel

              </p>

            </>

          )

        }

      </div>

      {/* Menu */}

      <div className="flex-1 overflow-y-auto p-4">

        {

          !collapsed && (

            <p className="uppercase text-xs font-bold text-gray-400 mb-4">

              Main Menu

            </p>

          )

        }

        <div className="space-y-2">

          {

            menus.map((item) => {

              const Icon = item.icon;

              const active =

                location.pathname === item.path;

              return (

                <Link

                  key={item.title}

                  to={item.path}

                  title={collapsed ? item.title : ""}

                  className={`

                  flex

                  items-center

                  ${collapsed ? "justify-center" : "gap-4"}

                  px-4

                  py-3

                  rounded-2xl

                  transition-all

                  duration-200

                  font-medium

                  ${

                    active

                      ?

                      "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg"

                      :

                      "hover:bg-blue-50 text-gray-700 hover:text-blue-700"

                  }

                  `}
                >

                  <Icon size={22} />

                  {

                    !collapsed &&
                    <span>{item.title}</span>

                  }

                </Link>

              );

            })

          }

        </div>

      </div>

      {/* Profile */}

      <div className="border-t p-4">

        {

          collapsed ?

            (

              <div className="flex justify-center mb-4">

                <div className="w-11 h-11 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center text-white font-bold">

                  {user?.username?.charAt(0).toUpperCase()}

                </div>

              </div>

            )

            :

            (

              <div className="bg-gray-50 rounded-2xl p-3 mb-4">

                <div className="flex items-center gap-3">

                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center text-white font-bold">

                    {user?.username?.charAt(0).toUpperCase()}

                  </div>

                  <div>

                    <h3 className="font-semibold text-gray-800">

                      {user?.username}

                    </h3>

                    <p className="text-sm text-gray-500 flex items-center gap-1">

                      <ShieldCheck

                        size={15}

                        className="text-green-500"

                      />

                      Teacher

                    </p>

                  </div>

                </div>

              </div>

            )

        }

        <button

          onClick={logout}

          title="Logout"

          className={`

          w-full

          bg-gradient-to-r

          from-red-500

          to-red-600

          hover:from-red-600

          hover:to-red-700

          text-white

          rounded-2xl

          py-3

          flex

          items-center

          ${collapsed ? "justify-center" : "justify-center gap-3"}

          transition-all

          shadow-lg

          `}

        >

          <LogOut size={20} />

          {

            !collapsed &&
            <span className="font-semibold">
              Logout
            </span>

          }

        </button>

      </div>

    </aside>

  );

}

export default TeacherSidebar;