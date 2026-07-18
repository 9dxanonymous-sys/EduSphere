import api from "../api/axios";

const auth = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

// Summary
export const getSummary = async () => {
  const res = await api.get("/reports/summary", auth());
  return res.data;
};

// Course Reports
export const getCourseReports = async () => {
  const res = await api.get("/reports/courses", auth());
  return res.data;
};

// Course Details
export const getCourseDetails = async (id) => {
  const res = await api.get(`/reports/courses/${id}`, auth());
  return res.data;
};

// Teacher Reports
export const getTeacherReports = async () => {
  const res = await api.get("/reports/teachers", auth());
  return res.data;
};

// Teacher Details
export const getTeacherDetails = async (id) => {
  const res = await api.get(`/reports/teachers/${id}`, auth());
  return res.data;
};

// Student Reports
export const getStudentReports = async () => {
  const res = await api.get("/reports/students", auth());
  return res.data;
};

// Student Details
export const getStudentDetails = async (id) => {
  const res = await api.get(`/reports/students/${id}`, auth());
  return res.data;
};