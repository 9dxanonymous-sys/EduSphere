import api from "../api/axios";

export const getDashboardCounts = async () => {
  const token = localStorage.getItem("token");

  const response = await api.get("/dashboard/admin", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};