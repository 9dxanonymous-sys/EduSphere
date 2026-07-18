import {
  UserCircle2,
  GraduationCap,
  Shield,
  UserCheck,
  BadgeCheck,
  Mail,
} from "lucide-react";

function UserTable({ users }) {

  const getInitials = (name) => {

    if (!name) return "U";

    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();

  };

  const getRole = (role) => {

    switch ((role || "").toLowerCase()) {

      case "admin":
        return {
          color: "bg-red-100 text-red-700",
          icon: Shield,
        };

      case "teacher":
        return {
          color: "bg-blue-100 text-blue-700",
          icon: UserCheck,
        };

      case "student":
        return {
          color: "bg-green-100 text-green-700",
          icon: GraduationCap,
        };

      default:
        return {
          color: "bg-gray-100 text-gray-700",
          icon: UserCircle2,
        };

    }

  };

  return (

    <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

      {/* Header */}

      <div className="flex justify-between items-center px-8 py-6 border-b">

        <div>

          <h2 className="text-2xl font-bold text-gray-800">
            Registered Users
          </h2>

          <p className="text-gray-500 mt-1">
            View all users available in EduSphere.
          </p>

        </div>

        <div className="bg-blue-50 text-blue-700 px-5 py-2 rounded-full font-semibold">

          {users.length} Users

        </div>

      </div>

      {/* Table */}

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="px-6 py-4 text-left text-sm font-bold uppercase text-gray-600">
                ID
              </th>

              <th className="px-6 py-4 text-left text-sm font-bold uppercase text-gray-600">
                User
              </th>

              <th className="px-6 py-4 text-left text-sm font-bold uppercase text-gray-600">
                Email
              </th>

              <th className="px-6 py-4 text-left text-sm font-bold uppercase text-gray-600">
                Role
              </th>

              <th className="px-6 py-4 text-left text-sm font-bold uppercase text-gray-600">
                Status
              </th>

            </tr>

          </thead>

          <tbody>

            {users.length === 0 ? (

              <tr>

                <td
                  colSpan="5"
                  className="text-center py-20"
                >

                  <UserCircle2
                    size={70}
                    className="mx-auto text-gray-300 mb-4"
                  />

                  <h2 className="text-2xl font-bold text-gray-700">
                    No Users Found
                  </h2>

                  <p className="text-gray-500 mt-2">
                    There are no registered users.
                  </p>

                </td>

              </tr>

            ) : (

              users.map((user) => {

                const role = getRole(user.role);
                const RoleIcon = role.icon;

                return (

                  <tr
                    key={user.id}
                    className="border-b last:border-none hover:bg-blue-50 transition-all duration-200"
                  >

                    {/* ID */}

                    <td className="px-6 py-5 font-semibold text-gray-700">

                      #{user.id}

                    </td>

                    {/* User */}

                    <td className="px-6 py-5">

                      <div className="flex items-center gap-4">

                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white flex items-center justify-center font-bold">

                          {getInitials(user.full_name)}

                        </div>

                        <div>

                          <p className="font-semibold text-gray-800">

                            {user.full_name}

                          </p>

                          <p className="text-xs text-gray-500">

                            EduSphere User

                          </p>

                        </div>

                      </div>

                    </td>

                    {/* Email */}

                    <td className="px-6 py-5">

                      <div className="flex flex-col">

                        <span className="text-gray-700 flex items-center gap-2">

                          <Mail size={15} />

                          {user.email}

                        </span>

                        <span className="text-xs text-green-600 flex items-center gap-1 mt-1">

                          <BadgeCheck size={14} />

                          Verified Account

                        </span>

                      </div>

                    </td>

                    {/* Role */}

                    <td className="px-6 py-5">

                      <span
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${role.color}`}
                      >

                        <RoleIcon size={16} />

                        {user.role || "User"}

                      </span>

                    </td>

                    {/* Status */}

                    <td className="px-6 py-5">

                      <span className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">

                        <div className="w-2 h-2 rounded-full bg-green-600"></div>

                        Active

                      </span>

                    </td>

                  </tr>

                );

              })

            )}

          </tbody>

        </table>

      </div>

      {/* Footer */}

      <div className="px-8 py-5 bg-gray-50 border-t flex justify-between items-center">

        <p className="text-sm text-gray-500">

          Showing all registered users.

        </p>

        <span className="font-semibold text-blue-600">

          Total : {users.length}

        </span>

      </div>

    </div>

  );

}

export default UserTable;