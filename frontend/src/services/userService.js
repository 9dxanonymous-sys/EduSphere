import api from "../api/axios";

const auth = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getUsers = async () => {
  const res = await api.get("/users/", auth());
  return res.data;
};