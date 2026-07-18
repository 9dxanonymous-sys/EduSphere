import api from "../api/axios";

const auth = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

// =============== Student Self-Service ===============

export const getMyAttendance = async () => {
  const res = await api.get("/attendance/student/my", auth());
  return res.data;
};