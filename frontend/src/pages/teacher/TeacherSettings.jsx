import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import {
  Settings as SettingsIcon,
  User,
  Mail,
  Shield,
  CheckCircle,
  Monitor,
  Search,
  Lock,
} from "lucide-react";

import ChangePasswordModal from "../../components/teacherDashboard/ChangePasswordModal";

import {
  getTeacherProfile,
  updateTeacherProfile,
} from "../../services/teacherService";

function TeacherSettings() {

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    department: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [showPasswordModal, setShowPasswordModal] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {

    try {

      setLoading(true);

      const data = await getTeacherProfile();

      setFormData({
        full_name: data.full_name,
        email: data.email,
        department: data.department,
      });

    }

    catch (err) {

      console.log(err);
      alert("Failed to load profile");

    }

    finally {

      setLoading(false);

    }

  };

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setSaving(true);

      await updateTeacherProfile(formData);

      alert("Profile Updated Successfully");

      loadProfile();

    }

    catch (err) {

      console.log(err);
      alert("Update Failed");

    }

    finally {

      setSaving(false);

    }

  };

  const cards = [

    {
      title: "Role",
      value: "Teacher",
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
      title: "System",
      value: "EduSphere",
      icon: Monitor,
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
              Teacher Settings
            </h1>

            <p className="text-blue-100 mt-2">
              Manage your profile and account preferences.
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

                    <p className="text-white/80">
                      {card.title}
                    </p>

                    <h2 className="text-3xl font-bold mt-2">
                      {card.value}
                    </h2>

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

      {/* Profile Form */}

      <motion.div
        whileHover={{ y: -3 }}
        className="bg-white rounded-3xl shadow-xl p-8"
      >

        <div className="flex items-center gap-3 mb-8">

          <div className="bg-blue-100 p-3 rounded-xl">

            <User className="text-blue-600" size={24} />

          </div>

          <div>

            <h2 className="text-2xl font-bold text-gray-800">
              Profile Information
            </h2>

            <p className="text-gray-500">
              Update your account information.
            </p>

          </div>

        </div>

        <form onSubmit={handleSubmit}>

          <div className="grid lg:grid-cols-2 gap-6">

            {/* Full Name - sabse pehle */}

            <div>

              <label className="block font-semibold mb-2">
                Full Name
              </label>

              <div className="relative">

                <User
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={20}
                />

                <input
                  type="text"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter Full Name"
                  required
                />

              </div>

            </div>

            {/* Email */}

            <div>

              <label className="block font-semibold mb-2">
                Email Address
              </label>

              <div className="relative">

                <Mail
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={20}
                />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter Email"
                  required
                />

              </div>

            </div>

            {/* Department */}

            <div>

              <label className="block font-semibold mb-2">
                Department
              </label>

              <div className="relative">

                <Monitor
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={20}
                />

                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter Department"
                  required
                />

              </div>

            </div>

          </div>

          {/* Summary */}

          <div className="mt-10">

            <h2 className="text-xl font-bold mb-6">
              Account Summary
            </h2>

            <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">

              <div className="border rounded-2xl p-5 bg-gray-50">

                <p className="text-sm text-gray-500">
                  Full Name
                </p>

                <h3 className="font-bold text-lg mt-2">
                  {formData.full_name}
                </h3>

              </div>

              <div className="border rounded-2xl p-5 bg-gray-50">

                <p className="text-sm text-gray-500">
                  Email
                </p>

                <h3 className="font-bold text-lg mt-2 break-all">
                  {formData.email}
                </h3>

              </div>

              <div className="border rounded-2xl p-5 bg-gray-50">

                <p className="text-sm text-gray-500">
                  Role
                </p>

                <h3 className="font-bold text-lg mt-2">
                  Teacher
                </h3>

              </div>

              <div className="border rounded-2xl p-5 bg-gray-50">

                <p className="text-sm text-gray-500">
                  Status
                </p>

                <span className="inline-flex items-center gap-2 mt-2 bg-green-100 text-green-700 px-4 py-2 rounded-full">

                  <div className="w-2 h-2 rounded-full bg-green-600"></div>
                  Active

                </span>

              </div>

            </div>

          </div>

          {/* About EduSphere */}

          <div className="mt-10 bg-white border rounded-3xl shadow-sm p-8">

            <div className="flex items-center gap-3 mb-5">

              <div className="bg-blue-100 p-3 rounded-xl">

                <Monitor className="text-blue-600" size={24} />

              </div>

              <div>

                <h2 className="text-2xl font-bold text-gray-800">
                  About EduSphere
                </h2>

                <p className="text-gray-500">
                  University Management System Overview
                </p>

              </div>

            </div>

            <p className="text-gray-600 leading-8">

              EduSphere is a modern University Management System
              developed using React, FastAPI and PostgreSQL.
              It provides a centralized platform for managing
              students, teachers, courses, reports and
              administrative operations through a secure and
              user-friendly dashboard.

            </p>

          </div>

          {/* Features */}

          <div className="grid md:grid-cols-3 gap-6 mt-8">

            <div className="bg-white rounded-3xl shadow-xl border p-6 hover:-translate-y-1 transition-all">

              <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center mb-5">

                <Search
                  className="text-blue-600"
                  size={28}
                />

              </div>

              <h3 className="text-xl font-bold mb-3">
                Fast
              </h3>

              <p className="text-gray-600 leading-7">

                Built using React and FastAPI to provide
                high-speed performance and smooth user
                experience.

              </p>

            </div>

            <div className="bg-white rounded-3xl shadow-xl border p-6 hover:-translate-y-1 transition-all">

              <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center mb-5">

                <Shield
                  className="text-green-600"
                  size={28}
                />

              </div>

              <h3 className="text-xl font-bold mb-3">
                Secure
              </h3>

              <p className="text-gray-600 leading-7">

                JWT Authentication and protected APIs keep
                your university data secure and reliable.

              </p>

            </div>

            <div className="bg-white rounded-3xl shadow-xl border p-6 hover:-translate-y-1 transition-all">

              <div className="w-14 h-14 rounded-2xl bg-purple-100 flex items-center justify-center mb-5">

                <SettingsIcon
                  className="text-purple-600"
                  size={28}
                />

              </div>

              <h3 className="text-xl font-bold mb-3">
                Scalable
              </h3>

              <p className="text-gray-600 leading-7">

                Easily extendable for Student, Teacher,
                Admin and future management modules.

              </p>

            </div>

          </div>

          {/* Security */}

          <div className="mt-8 bg-white border rounded-3xl shadow-sm p-8">

            <div className="flex justify-between items-center">

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
                type="button"
                onClick={() => setShowPasswordModal(true)}
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold hover:shadow-xl transition"
              >
                Change Password
              </button>

            </div>

          </div>

          {/* Save Button */}

          <div className="mt-10 flex justify-end">

            <button
              type="submit"
              disabled={saving}
              className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-semibold px-8 py-3 rounded-xl shadow-lg transition-all disabled:opacity-60"
            >

              {saving ? "Saving..." : "💾 Save Changes"}

            </button>

          </div>

        </form>

      </motion.div>

      {/* Footer */}

      <div className="bg-white rounded-3xl shadow-xl border p-6">

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">

          <div>

            <h3 className="text-xl font-bold text-gray-800">
              EduSphere Management System
            </h3>

            <p className="text-gray-500 mt-1">
              Manage your account settings securely and efficiently.
            </p>

          </div>

          <div className="text-center md:text-right">

            <p className="font-semibold text-blue-600">
              Version 1.0.0
            </p>

            <p className="text-gray-500 text-sm">
              React • FastAPI • PostgreSQL
            </p>

          </div>

        </div>

      </div>

      {/* Change Password Modal */}

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

export default TeacherSettings;