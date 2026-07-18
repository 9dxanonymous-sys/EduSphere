import { motion } from "framer-motion";
import {
  Mail,
  Building2,
  GraduationCap,
  Award,
  BookOpen,
  CheckCircle,
} from "lucide-react";

function getInitials(name) {
  if (!name) return "?";

  const parts = name.trim().split(" ");

  return parts.length > 1
    ? `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase()
    : parts[0].slice(0, 2).toUpperCase();
}

function DetailRow({ icon: Icon, iconColor, iconBg, label, value }) {
  return (
    <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3">
      <div
        className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
        style={{ backgroundColor: iconBg }}
      >
        <Icon size={16} style={{ color: iconColor }} />
      </div>

      <div className="min-w-0">
        <p className="text-[11px] font-medium text-gray-400 uppercase tracking-wide">
          {label}
        </p>

        <p className="text-sm font-medium text-gray-700 truncate">
          {value}
        </p>
      </div>
    </div>
  );
}

function StudentDashboardProfile({ user, profile }) {

  const name = profile?.full_name || user?.username || "Student";

  const cgpa = Number(profile?.cgpa || 0);

  const earnedCredits = profile?.earned_credit_hours || 0;

  const totalCredits = profile?.total_credit_hours || 0;

  const progress =
    totalCredits > 0
      ? ((earnedCredits / totalCredits) * 100).toFixed(0)
      : 0;


  const promotedStatus =
    cgpa >= 2 ? "Promoted" : "Not Promoted";


  const academicStatus = () => {

    if (cgpa >= 3.5) return "Excellent";

    if (cgpa >= 3.0) return "Good Standing";

    if (cgpa >= 2.5) return "Satisfactory";

    return "Academic Warning";

  };


  return (

    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-3xl shadow-xl p-6"
    >

      {/* Heading */}

      <h2 className="text-xl font-bold text-gray-800 mb-6">
        Student Profile
      </h2>


      {/* Avatar */}

      <div className="flex flex-col items-center text-center">

        <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg">

          {getInitials(name)}

        </div>


        <h3 className="text-xl font-bold text-gray-900 mt-4">

          {name}

        </h3>


        <p className="text-sm text-gray-500">
          BS Computer Science
        </p>

      </div>


      {/* Basic Details */}

      <div className="space-y-3 mt-6">

        <DetailRow
          icon={Mail}
          iconColor="#2563eb"
          iconBg="#EFF6FF"
          label="Email"
          value={user?.email || "N/A"}
        />

        <DetailRow
          icon={Building2}
          iconColor="#16a34a"
          iconBg="#F0FDF4"
          label="Department"
          value={profile?.department || "N/A"}
        />

        <DetailRow
          icon={GraduationCap}
          iconColor="#7c3aed"
          iconBg="#F5F3FF"
          label="Semester"
          value={
            profile?.semester
              ? `Semester ${profile.semester}`
              : "N/A"
          }
        />

      </div>


      {/* Academic Summary */}

      <div className="mt-7">

        <h3 className="text-lg font-bold text-gray-800 mb-4">
          Academic Summary
        </h3>

        <div className="space-y-3">

          <DetailRow
            icon={CheckCircle}
            iconColor="#16a34a"
            iconBg="#F0FDF4"
            label="Promoted Status"
            value={promotedStatus}
          />

          <DetailRow
            icon={BookOpen}
            iconColor="#2563eb"
            iconBg="#EFF6FF"
            label="Earned Credit Hours"
            value={`${earnedCredits} CH`}
          />

          <DetailRow
            icon={BookOpen}
            iconColor="#7c3aed"
            iconBg="#F5F3FF"
            label="Total Credit Hours"
            value={`${totalCredits} CH`}
          />

        </div>

      </div>


      {/* CGPA Card */}

      <div className="mt-6 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 p-5 text-white shadow-lg">

        <div className="flex items-center gap-3">

          <div className="p-3 rounded-xl bg-white/20">

            <Award size={22} />

          </div>

          <div>

            <p className="text-sm text-white/90">
              Current CGPA
            </p>

            <h2 className="text-2xl font-bold">

              {profile?.cgpa ?? "N/A"}

            </h2>

          </div>

        </div>


        <div className="mt-4 border-t border-white/20 pt-3">

          <p className="text-sm text-white/90">
            Academic Status
          </p>

          <p className="font-semibold">
            {academicStatus()}
          </p>

        </div>

      </div>


      {/* Academic Progress */}

      <div className="mt-7">

        <h3 className="text-lg font-bold text-gray-800 mb-3">
          Academic Progress
        </h3>


        <div className="flex justify-between text-sm font-medium text-gray-600 mb-2">

          <span>
            Credits Completed
          </span>

          <span>
            {earnedCredits} / {totalCredits}
          </span>

        </div>


        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">

          <div
            className="h-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-500"
            style={{
              width: `${progress}%`,
            }}
          />

        </div>


        <p className="text-sm text-right text-gray-500 mt-2">

          {progress}% Completed

        </p>

      </div>

    </motion.div>

  );
}

export default StudentDashboardProfile;