import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  User, Lock, GraduationCap, Loader2, Eye, EyeOff,
  BookOpen, Users, CalendarCheck, ArrowRight,
  LayoutDashboard, FileBarChart2, Bell, Quote, Mail, Phone, MapPin,
} from "lucide-react";

import { loginUser } from "../../services/authService";

// Precomputes an elliptical "orbit" path (x/y/scale/opacity per step) so an icon
// reads as passing behind/in front of the core sphere as it circles it.
function orbitKeyframes(offsetDeg, steps = 24, radiusX = 160, radiusY = 46) {
  const x = [], y = [], scale = [], opacity = [], zIndex = [];
  for (let i = 0; i <= steps; i++) {
    const angle = (((360 / steps) * i + offsetDeg) * Math.PI) / 180;
    x.push(Math.cos(angle) * radiusX);
    y.push(Math.sin(angle) * radiusY);
    const depth = (Math.sin(angle) + 1) / 2; // 0 = behind core, 1 = in front
    scale.push(0.62 + depth * 0.5);
    opacity.push(0.5 + depth * 0.5);
    zIndex.push(depth > 0.5 ? 30 : 5);
  }
  return { x, y, scale, opacity, zIndex };
}

function HeroScene() {
  const reduceMotion = useReducedMotion();
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMove = (e) => {
    if (reduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: py * -8, y: px * 12 });
  };
  const resetTilt = () => setTilt({ x: 0, y: 0 });

  const satellites = [
    { Icon: BookOpen, offset: 0 },
    { Icon: Users, offset: 90 },
    { Icon: FileBarChart2, offset: 180 },
    { Icon: Bell, offset: 270 },
  ];

  return (
    <div
      onMouseMove={handleMove}
      onMouseLeave={resetTilt}
      className="absolute inset-0 flex items-start justify-center pointer-events-auto"
      style={{ perspective: "1400px" }}
    >
      <motion.div
        className="relative"
        style={{ width: 480, height: 480, marginTop: "4%", transformStyle: "preserve-3d" }}
        animate={{ rotateX: tilt.x, rotateY: tilt.y }}
        transition={{ type: "spring", stiffness: 60, damping: 12 }}
      >
        {/* glowing core */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 90, height: 90, left: "50%", top: "50%", marginLeft: -45, marginTop: -45,
            background: "radial-gradient(circle at 35% 30%, rgba(255,255,255,0.95), rgba(224,242,254,0.5) 40%, transparent 70%)",
            boxShadow: "0 0 60px 12px rgba(255,255,255,0.35)",
          }}
          animate={reduceMotion ? {} : { scale: [1, 1.08, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* gyroscope rings */}
        {!reduceMotion && (
          <>
            <motion.div className="absolute inset-0" style={{ transformStyle: "preserve-3d" }} animate={{ rotateY: 360 }} transition={{ duration: 18, repeat: Infinity, ease: "linear" }}>
              <div className="absolute rounded-full" style={{ inset: 90, border: "2px solid rgba(255,255,255,0.55)", boxShadow: "0 0 24px rgba(255,255,255,0.25)", transform: "rotateX(75deg)" }} />
            </motion.div>
            <motion.div className="absolute inset-0" style={{ transformStyle: "preserve-3d" }} animate={{ rotateY: -360 }} transition={{ duration: 26, repeat: Infinity, ease: "linear" }}>
              <div className="absolute rounded-full" style={{ inset: 55, border: "2px solid rgba(191,219,254,0.6)", transform: "rotateX(58deg) rotateZ(35deg)" }} />
            </motion.div>
            <motion.div className="absolute inset-0" style={{ transformStyle: "preserve-3d" }} animate={{ rotateY: 360 }} transition={{ duration: 34, repeat: Infinity, ease: "linear" }}>
              <div className="absolute rounded-full" style={{ inset: 10, border: "1.5px solid rgba(255,255,255,0.25)", transform: "rotateX(82deg) rotateZ(-20deg)" }} />
            </motion.div>
          </>
        )}

        {/* orbiting feature icons */}
        {satellites.map(({ Icon, offset }, i) => {
          const kf = orbitKeyframes(offset);
          return (
            <motion.div
              key={i}
              className="absolute rounded-xl bg-white flex items-center justify-center shadow-xl"
              style={{ width: 44, height: 44, left: "50%", top: "50%", marginLeft: -22, marginTop: -22 }}
              animate={
                reduceMotion
                  ? { x: Math.cos((offset * Math.PI) / 180) * 160, y: Math.sin((offset * Math.PI) / 180) * 46 }
                  : { x: kf.x, y: kf.y, scale: kf.scale, opacity: kf.opacity, zIndex: kf.zIndex }
              }
              transition={reduceMotion ? {} : { duration: 14, repeat: Infinity, ease: "linear" }}
            >
              <Icon size={18} className="text-blue-600" />
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}

function LoginCard() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await loginUser(username, password);
      if (!data || data.error || !data.user) {
        setError(data?.error || "Invalid Username or Password");
        setLoading(false);
        return;
      }
      localStorage.setItem("token", data.access_token);
      localStorage.setItem("user", JSON.stringify(data.user));
      if (data.user.role === "admin") window.location.href = "/admin/dashboard";
      else if (data.user.role === "teacher") window.location.href = "/teacher/dashboard";
      else window.location.href = "/student/dashboard";
    } catch (err) {
      console.error(err);
      setError("Invalid Username or Password");
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ rotateX: 2, rotateY: -3 }}
      className="relative bg-white p-8 rounded-2xl shadow-2xl w-full max-w-sm mx-auto border border-gray-100"
      style={{ transformStyle: "preserve-3d", perspective: "1400px" }}
    >
      <motion.div
        whileHover={{ scale: 1.08, rotate: 6 }}
        className="absolute left-1/2 -translate-x-1/2 -top-7 w-14 h-14 rounded-full flex items-center justify-center bg-gradient-to-br from-indigo-700 via-blue-600 to-cyan-500 shadow-lg shadow-blue-500/40 ring-4 ring-white"
      >
        <GraduationCap size={26} className="text-white" />
      </motion.div>

      <h2 className="text-2xl font-bold text-center text-gray-800 mt-4">Welcome back</h2>
      <p className="text-center text-gray-500 mt-1 text-sm">Sign in to your account</p>

      <form onSubmit={handleLogin} className="mt-6">
        <div className="relative">
          <User size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Username / Email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border border-gray-200 bg-gray-50 focus:bg-white p-3 pl-10 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>

        <div className="relative mt-4">
          <Lock size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-200 bg-gray-50 focus:bg-white p-3 pl-10 pr-10 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          <button
            type="button"
            onClick={() => setShowPassword((s) => !s)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            tabIndex={-1}
          >
            {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
          </button>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, x: [0, -4, 4, -4, 4, 0] }}
            transition={{ duration: 0.4 }}
            className="mt-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2"
          >
            {error}
          </motion.div>
        )}

        <motion.button
          type="submit"
          disabled={loading}
          whileHover={{ scale: loading ? 1 : 1.02 }}
          whileTap={{ scale: loading ? 1 : 0.98 }}
          className="w-full text-white p-3 rounded-lg mt-6 flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-700 via-blue-600 to-cyan-500 hover:brightness-110 shadow-lg shadow-blue-500/30 disabled:opacity-70"
        >
          {loading ? (<><Loader2 size={16} className="animate-spin" />Signing in…</>) : "Login"}
        </motion.button>
      </form>

      <p className="text-center text-gray-400 mt-6 text-xs">
        Trouble signing in? Contact your administrator.
      </p>
    </motion.div>
  );
}

// Stylized product preview — a fake "browser frame" showing the shape of the real dashboard.
function ProductMockup() {
  const sidebarIcons = [LayoutDashboard, Users, BookOpen, FileBarChart2, Bell];
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6 }}
      className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-200 bg-white max-w-3xl mx-auto"
    >
      <div className="flex items-center gap-1.5 px-4 py-3 bg-gray-50 border-b border-gray-200">
        <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
        <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
        <span className="ml-3 text-xs text-gray-400">edusphere.app/admin/dashboard</span>
      </div>

      <div className="flex" style={{ minHeight: 300 }}>
        <div className="w-14 sm:w-16 bg-gradient-to-b from-indigo-700 via-blue-600 to-cyan-500 flex flex-col items-center py-4 gap-4">
          <GraduationCap size={20} className="text-white mb-2" />
          {sidebarIcons.map((Icon, i) => (
            <div key={i} className={`p-2 rounded-lg ${i === 0 ? "bg-white/20" : ""}`}>
              <Icon size={16} className="text-white/90" />
            </div>
          ))}
        </div>

        <div className="flex-1 p-5 bg-gray-50">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="h-3 w-28 rounded bg-gray-300 mb-2" />
              <div className="h-2 w-40 rounded bg-gray-200" />
            </div>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-700 via-blue-600 to-cyan-500" />
          </div>

          <div className="grid grid-cols-3 gap-3 mb-4">
            {["Students", "Teachers", "Courses"].map((label, i) => (
              <div key={label} className="bg-white rounded-xl p-3 border border-gray-100 shadow-sm">
                <div className="text-blue-600 font-bold text-lg">{[1240, 86, 58][i]}</div>
                <div className="text-[10px] text-gray-400 mt-1">{label}</div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
            <div className="h-2 w-24 rounded bg-gray-200 mb-3" />
            <div className="flex items-end gap-2" style={{ height: 60 }}>
              {[40, 65, 30, 80, 55, 70, 45].map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  whileInView={{ height: `${h}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.06 }}
                  className="flex-1 rounded-t bg-gradient-to-t from-blue-600 to-cyan-400"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Login() {
  const scrollToLogin = () => {
    document.getElementById("login-section")?.scrollIntoView({ behavior: "smooth" });
  };

  const features = [
    { icon: LayoutDashboard, title: "Unified Dashboard", body: "One view of everything happening across the institution, updated live." },
    { icon: Users, title: "Student & Staff Records", body: "Centralized profiles for every student and teacher, always up to date." },
    { icon: BookOpen, title: "Courses & Enrollment", body: "Create courses, assign teachers, and manage enrollment in a few clicks." },
    { icon: CalendarCheck, title: "Attendance Tracking", body: "Mark and review attendance per class, with a full history per student." },
    { icon: FileBarChart2, title: "Grades & Reports", body: "Record results and generate reports for classes, courses, or terms." },
    { icon: Bell, title: "Announcements", body: "Push updates to the right audience — everyone, one course, or one class." },
  ];

  const pillars = [
    { icon: Users, title: "For Admins", body: "Manage enrollment, staff, and institution-wide records from one dashboard." },
    { icon: BookOpen, title: "For Teachers", body: "Track attendance, post grades, and share announcements with your classes." },
    { icon: CalendarCheck, title: "For Students", body: "See your courses, assignments, grades, and timetable in one place." },
  ];

  const stats = [
    { value: "12,400+", label: "Students" },
    { value: "620", label: "Faculty" },
    { value: "58", label: "Programs" },
    { value: "24/7", label: "Portal Access" },
  ];

  return (
    <div className="bg-white">
      {/* Nav */}
      <nav className="sticky top-0 z-40 h-16 px-8 flex justify-between items-center bg-white/80 backdrop-blur-xl border-b border-gray-200 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-br from-indigo-700 via-blue-600 to-cyan-500">
            <GraduationCap size={16} className="text-white" />
          </div>
          <span className="font-bold text-gray-800 text-lg">EduSphere</span>
        </div>
        <div className="hidden sm:flex items-center gap-6 text-sm text-gray-500">
          <span>Features</span>
          <span>For Admins</span>
          <span>For Teachers</span>
          <span>For Students</span>
        </div>
        <button onClick={scrollToLogin} className="text-sm font-medium text-blue-600 hover:text-indigo-700 transition">
          Login →
        </button>
      </nav>

      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center text-center px-6 overflow-hidden bg-gradient-to-r from-indigo-700 via-blue-600 to-cyan-500 pt-20 pb-28">
        <HeroScene />

        <motion.span
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative text-xs font-semibold tracking-widest uppercase text-blue-100"
        >
          University Management Portal
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative font-bold text-white mt-4 max-w-2xl"
          style={{ fontSize: "clamp(2.2rem, 5vw, 3.6rem)", lineHeight: 1.15 }}
        >
          One portal for your whole university
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative text-blue-100 mt-5 max-w-lg leading-7"
        >
          Admissions, attendance, grades, and announcements — connected for admins, teachers, and students alike.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative flex flex-wrap items-center justify-center gap-3 mt-8"
        >
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={scrollToLogin}
            className="rounded-lg flex items-center gap-2 px-7 py-3 font-semibold text-blue-700 bg-white shadow-lg hover:shadow-xl transition"
          >
            Sign in to your account <ArrowRight size={16} />
          </motion.button>
          <a href="#features" className="rounded-lg px-7 py-3 font-semibold text-white border border-white/40 hover:bg-white/10 transition">
            Explore features
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="relative w-full mt-16"
          style={{ marginBottom: -140 }}
        >
          <ProductMockup />
        </motion.div>
      </section>

      <div style={{ height: 150 }} />

      {/* Features */}
      <section id="features" className="max-w-6xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-xs font-semibold tracking-widest uppercase text-blue-600">Everything in one place</span>
          <h2 className="font-bold text-gray-800 mt-3" style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)" }}>What EduSphere handles for you</h2>
        </motion.div>
        <div className="grid gap-6" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}>
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
              whileHover={{ y: -4 }}
              className="rounded-2xl p-6 bg-gray-50 border border-gray-100 hover:shadow-lg transition"
            >
              <div className="flex items-center justify-center rounded-full mb-4 w-11 h-11 bg-blue-100">
                <f.icon size={20} className="text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-800">{f.title}</h3>
              <p className="text-gray-500 text-sm mt-2 leading-6">{f.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Pillars */}
      <section className="px-6 py-20 bg-gray-50 border-y border-gray-100">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14 max-w-6xl mx-auto"
        >
          <span className="text-xs font-semibold tracking-widest uppercase text-blue-600">Built for everyone on campus</span>
          <h2 className="font-bold text-gray-800 mt-3" style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)" }}>Three panels, one system</h2>
        </motion.div>
        <div className="max-w-6xl mx-auto grid gap-6" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}>
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              whileHover={{ y: -4 }}
              className="h-full rounded-2xl p-7 bg-white border border-gray-100 hover:shadow-lg transition"
            >
              <div className="flex items-center justify-center rounded-full mb-5 w-11 h-11 bg-blue-100">
                <p.icon size={20} className="text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-800 text-lg">{p.title}</h3>
              <p className="text-gray-500 text-sm mt-2 leading-6">{p.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto grid gap-8 text-center"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))" }}
        >
          {stats.map((s) => (
            <div key={s.label}>
              <div className="font-bold text-blue-600" style={{ fontSize: 30 }}>{s.value}</div>
              <div className="text-gray-500 text-xs mt-1 tracking-wide uppercase">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Quote / testimonial band */}
      <section className="px-6 py-20 bg-gradient-to-r from-indigo-700 via-blue-600 to-cyan-500">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center text-white"
        >
          <Quote size={28} className="mx-auto mb-4 text-blue-100" />
          <p className="text-lg sm:text-xl leading-relaxed">
            "Moving attendance, grades, and announcements into one portal cut our admin
            team's paperwork time in half within the first term."
          </p>
          <p className="mt-5 text-sm text-blue-100 font-medium">Registrar's Office</p>
        </motion.div>
      </section>

      {/* Login */}
      <section id="login-section" className="px-6 py-28 flex flex-col items-center bg-slate-100">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <span className="text-xs font-semibold tracking-widest uppercase text-blue-600">Ready when you are</span>
          <h2 className="font-bold text-gray-800 mt-3" style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)" }}>Sign in to EduSphere</h2>
        </motion.div>
        <LoginCard />
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 px-6 pt-14 pb-8">
        <div className="max-w-6xl mx-auto grid gap-10 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-full flex items-center justify-center bg-gradient-to-br from-indigo-700 via-blue-600 to-cyan-500">
                <GraduationCap size={14} className="text-white" />
              </div>
              <span className="font-bold text-white">EduSphere</span>
            </div>
            <p className="text-sm leading-6">The management portal built for modern universities.</p>
          </div>
          <div>
            <h4 className="text-white font-semibold text-sm mb-3">Product</h4>
            <ul className="space-y-2 text-sm">
              <li>Features</li>
              <li>For Admins</li>
              <li>For Teachers</li>
              <li>For Students</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold text-sm mb-3">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>Help Center</li>
              <li>Contact Administrator</li>
              <li>System Status</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold text-sm mb-3">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2"><Mail size={14} /> support@edusphere.edu</li>
              <li className="flex items-center gap-2"><Phone size={14} /> +1 (555) 010-2200</li>
              <li className="flex items-center gap-2"><MapPin size={14} /> Campus Admin Building</li>
            </ul>
          </div>
        </div>
        <div className="max-w-6xl mx-auto border-t border-gray-800 mt-10 pt-6 text-xs text-center">
          © {new Date().getFullYear()} EduSphere. All rights reserved.
        </div>
      </footer>
    </div>
  );
}