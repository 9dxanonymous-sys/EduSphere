import api from "../api/axios"; // Sirf ek sahi import rakhein

const auth = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getTeachers = async () => {
  const res = await api.get("/teachers/", auth());
  return res.data;
};

export const addTeacher = async (teacher) => {
  const res = await api.post("/teachers/", teacher, auth());
  return res.data;
};

export const updateTeacher = async (id, teacher) => {
  const res = await api.put(`/teachers/${id}`, teacher, auth());
  return res.data;
};

export const deleteTeacher = async (id) => {
  const res = await api.delete(`/teachers/${id}`, auth());
  return res.data;
};

export const assignCourse = async (teacherId, courseId) => {
  const res = await api.post(`/teachers/${teacherId}/assign-course/${courseId}`, {}, auth());
  return res.data;
};

export const getTeacherCourses = async (teacherId) => {
  const res = await api.get(`/teachers/${teacherId}/courses`, auth());
  return res.data;
};

export const getMyCourses = async () => {
  const res = await api.get("/teachers/my-courses", auth());
  return res.data;
};

export const getCourseStudents = async (courseId) => {
  // Auth token add kar diya taake secure data mil sake
  const response = await api.get(`/teachers/courses/${courseId}/students`, auth()); 
  return response.data;
};

export const markAttendance = async (attendanceData) => {
  const response = await api.post("/attendance/mark", attendanceData, auth());
  return response.data;
};

export const getTeacherProfile = async () => {
  const res = await api.get("/teachers/profile", auth());
  return res.data;
};

export const getTeacherDashboardStats = async () => {
  const res = await api.get("/teachers/dashboard-stats", auth());
  return res.data;
};



export const changeTeacherPassword = async (data) => {
  // Auth token add kiya
  const response = await api.put("/teachers/change-password", data, auth()); 
  return response.data;
};

export const updateTeacherProfile = async (data) => {
  const response = await api.put(
    "/teachers/profile",
    data,
    auth()
  );

  return response.data;
};

