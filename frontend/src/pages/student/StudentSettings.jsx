import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import {
  Settings as SettingsIcon,
  User,
  Mail,
  Shield,
  CheckCircle,
  Monitor,
  Lock,
  Layers,
} from "lucide-react";

import ChangePasswordModal from "../../components/studentDashboard/ChangePasswordModal";
import { getMyProfile } from "../../services/studentService";

function StudentSettings() {

  const [profile, setProfile] = useState({
    full_name: "",
    email: "",
    semester: "",
    department: "",
  });

  const [loading, setLoading] = useState(true);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {

    try {

      setLoading(true);

      const data = await getMyProfile();
      setProfile(data);

    } catch (err) {

      console.log(err);
      alert("Failed to load profile");

    } finally {

      setLoading(false);

    }

  };

  const cards = [

    {
      title: "Role",
      value: "Student",
      icon: Shield,
      color: "from-blue-600 to-cyan-500",
    },

    {
      title: "Status",
      value: "Active",
      icon: CheckCircle,
      color: "from-green-500 to-emerald-500",
    },

    {
      title: "Semester",
      value: profile.semester || "--",
      icon: Layers,
      color: "from-purple-600 to-indigo-500",
    },

    {
      title: "Version",
      value: "v1.0",
      icon: SettingsIcon,
      color: "from-orange-500 to-red-500",
    },

  ];

  if (loading) {

    return (

      <div className="bg-white rounded-3xl shadow-xl p-12">
        <p className="text-center text-lg text-gray-500">
          Loading Settings...
        </p>
      </div>

    );

  }

  return (

    <div className="space-y-8">

      {/* Header */}

      <div className="bg-gradient-to-r from-blue-700 via-indigo-600 to-cyan-500 rounded-3xl shadow-xl p-8 text-white">

        <div className="flex items-center gap-4">

          <div className="bg-white/20 p-4 rounded-2xl">
            <SettingsIcon size={38} />
          </div>

          <div>

            <h1 className="text-3xl font-bold">
              Student Settings
            </h1>

            <p className="text-blue-100 mt-2">
              View your profile and manage your account.
            </p>

          </div>

        </div>

      </div>

      {/* Stats */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        {

          cards.map((card) => {

            const Icon = card.icon;

            return (

              <motion.div
                whileHover={{ y: -4 }}
                key={card.title}
                className={`bg-gradient-to-r ${card.color} rounded-3xl shadow-xl p-6 text-white`}
              >

                <div className="flex justify-between items-center">

                  <div>
                    <p className="text-white/80">{card.title}</p>
                    <h2 className="text-3xl font-bold mt-2">{card.value}</h2>
                  </div>

                  <div className="bg-white/20 rounded-2xl p-4">
                    <Icon size={32} />
                  </div>

                </div>

              </motion.div>

            );

          })

        }

      </div>

      {/* Profile (view-only) */}

      <motion.div
        whileHover={{ y: -3 }}
        className="bg-white rounded-3xl shadow-xl p-8"
      >

        <div className="flex items-center gap-3 mb-8">

          <div className="bg-blue-100 p-3 rounded-2xl">
            <User className="text-blue-700" size={24} />
          </div>

          <div>

            <h2 className="text-2xl font-bold text-gray-800">
              Profile Information
            </h2>

            <p className="text-gray-500">
              Your details as registered by the university.
            </p>

          </div>

        </div>

        <div className="grid lg:grid-cols-2 gap-6">

          <div>

            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Full Name
            </label>

            <input
              type="text"
              value={profile.full_name}
              readOnly
              className="w-full border rounded-2xl px-5 py-4 bg-gray-50"
            />

          </div>

          <div>

            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email Address
            </label>

            <input
              type="email"
              value={profile.email}
              readOnly
              className="w-full border rounded-2xl px-5 py-4 bg-gray-50"
            />

          </div>

          <div>

            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Semester
            </label>

            <input
              type="text"
              value={profile.semester}
              readOnly
              className="w-full border rounded-2xl px-5 py-4 bg-gray-50"
            />

          </div>

          <div>

            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Department
            </label>

            <input
              type="text"
              value={profile.department}
              readOnly
              className="w-full border rounded-2xl px-5 py-4 bg-gray-50"
            />

          </div>

        </div>

        <p className="text-sm text-gray-400 mt-4">
          To update your profile details, please contact the administration office.
        </p>

      </motion.div>

      {/* Security */}

      <motion.div
        whileHover={{ y: -3 }}
        className="bg-white rounded-3xl shadow-xl p-8"
      >

        <div className="flex justify-between items-center flex-wrap gap-4">

          <div className="flex items-center gap-4">

            <div className="bg-orange-100 p-4 rounded-2xl">
              <Lock className="text-orange-600" />
            </div>

            <div>

              <h2 className="text-xl font-bold">
                Account Security
              </h2>

              <p className="text-gray-500">
                Your account is protected with encrypted authentication.
              </p>

            </div>

          </div>

          <button
            onClick={() => setShowPasswordModal(true)}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold hover:shadow-xl transition"
          >
            Change Password
          </button>

        </div>

      </motion.div>

      {/* About EduSphere */}

      <motion.div
        whileHover={{ y: -3 }}
        className="bg-white rounded-3xl shadow-xl p-8"
      >

        <div className="flex items-center gap-3 mb-6">

          <div className="bg-indigo-100 p-3 rounded-2xl">
            <Monitor className="text-indigo-600" size={24} />
          </div>

          <div>

            <h2 className="text-2xl font-bold text-gray-800">
              About EduSphere
            </h2>

            <p className="text-gray-500">
              University Management System
            </p>

          </div>

        </div>

        <div className="grid md:grid-cols-3 gap-6">

          <div className="rounded-2xl bg-blue-50 p-6">
            <h3 className="font-bold text-lg text-blue-700">Version</h3>
            <p className="text-gray-600 mt-2">1.0.0</p>
          </div>

          <div className="rounded-2xl bg-green-50 p-6">
            <h3 className="font-bold text-lg text-green-700">Platform</h3>
            <p className="text-gray-600 mt-2">Student Dashboard</p>
          </div>

          <div className="rounded-2xl bg-purple-50 p-6">
            <h3 className="font-bold text-lg text-purple-700">Status</h3>
            <p className="text-green-600 font-semibold mt-2">Running Smoothly</p>
          </div>

        </div>

      </motion.div>

      {

        showPasswordModal && (

          <ChangePasswordModal
            onClose={() => setShowPasswordModal(false)}
            onSuccess={() => setShowPasswordModal(false)}
          />

        )

      }

    </div>

  );

}

export default StudentSettings;