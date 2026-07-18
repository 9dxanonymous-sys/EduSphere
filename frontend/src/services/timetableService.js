import api from "../api/axios";

const auth = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

// =============== Student Self-Service ===============

export const getMyStudentTimetable = async () => {
  const res = await api.get("/timetable/student/my", auth());
  return res.data;
};