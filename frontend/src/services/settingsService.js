import api from "../api/axios";

const auth = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getProfile = async () => {
  const res = await api.get("/users/me", auth());
  return res.data;
};

export const updateProfile = async (data) => {
  const res = await api.put("/users/me", data, auth());
  return res.data;
};