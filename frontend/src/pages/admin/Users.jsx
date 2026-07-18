import { useEffect, useMemo, useState } from "react";
import { Search, Users as UsersIcon, GraduationCap, UserCheck, Shield } from "lucide-react";

import DashboardLayout from "../../layouts/DashboardLayout";
import { getUsers } from "../../services/userService";
import UserTable from "../../components/users/UserTable";

function Users() {

  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {

    if (!search.trim()) {
      setFilteredUsers(users);
      return;
    }

    const value = search.toLowerCase();

    setFilteredUsers(

      users.filter(

        (user) =>

          user.full_name?.toLowerCase().includes(value) ||
          user.email?.toLowerCase().includes(value) ||
          user.role?.toLowerCase().includes(value)

      )

    );

  }, [search, users]);

  const loadUsers = async () => {

    try {

      setLoading(true);

      const data = await getUsers();

      setUsers(data);
      setFilteredUsers(data);

    }

    catch (err) {

      console.log(err);
      alert("Failed To Load Users");

    }

    finally {

      setLoading(false);

    }

  };



  const stats = useMemo(() => ({

    total: users.length,

    students: users.filter(
      (u) => u.role?.toLowerCase() === "student"
    ).length,

    teachers: users.filter(
      (u) => u.role?.toLowerCase() === "teacher"
    ).length,

    admins: users.filter(
      (u) => u.role?.toLowerCase() === "admin"
    ).length,

  }), [users]);



  const cards = [

    {
      title: "Total Users",
      value: stats.total,
      icon: UsersIcon,
      color: "from-blue-600 to-cyan-500",
    },

    {
      title: "Students",
      value: stats.students,
      icon: GraduationCap,
      color: "from-green-500 to-emerald-500",
    },

    {
      title: "Teachers",
      value: stats.teachers,
      icon: UserCheck,
      color: "from-purple-600 to-indigo-500",
    },

    {
      title: "Admins",
      value: stats.admins,
      icon: Shield,
      color: "from-orange-500 to-red-500",
    },

  ];



  return (

    <DashboardLayout>

      <div className="space-y-8">

        <div className="bg-gradient-to-r from-blue-700 via-indigo-600 to-cyan-500 rounded-3xl p-8 text-white shadow-xl">

          <div className="flex items-center gap-4">

            <div className="bg-white/20 p-4 rounded-2xl">

              <UsersIcon size={38} />

            </div>

            <div>

              <h1 className="text-3xl font-bold">
                Users Management
              </h1>

              <p className="text-blue-100 mt-2">
                View all registered users and their roles.
              </p>

            </div>

          </div>

        </div>



        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

          {

            cards.map((card) => {

              const Icon = card.icon;

              return (

                <div
                  key={card.title}
                  className={`bg-gradient-to-r ${card.color} rounded-3xl shadow-xl p-6 text-white`}
                >

                  <div className="flex justify-between items-center">

                    <div>

                      <p className="text-white/80">
                        {card.title}
                      </p>

                      <h2 className="text-4xl font-bold mt-2">
                        {card.value}
                      </h2>

                    </div>

                    <div className="bg-white/20 p-4 rounded-2xl">

                      <Icon size={34} />

                    </div>

                  </div>

                </div>

              );

            })

          }

        </div>



        <div className="bg-white rounded-3xl shadow-xl p-6">

          <div className="relative">

            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />

            <input
              type="text"
              placeholder="Search by name, email or role..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
            />

          </div>

        </div>



        {

          loading ?

            (

              <div className="bg-white rounded-3xl shadow-xl p-12">

                <p className="text-center text-gray-500 text-lg">
                  Loading Users...
                </p>

              </div>

            )

            :

            (

              <UserTable users={filteredUsers} />

            )

        }

      </div>

    </DashboardLayout>

  );

}

export default Users;