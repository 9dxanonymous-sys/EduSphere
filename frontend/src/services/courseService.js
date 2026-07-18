import api from "../api/axios";

const auth = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getCourses = async () => {
  const res = await api.get("/courses/", auth());
  return res.data;
};

export const addCourse = async (course) => {
  const res = await api.post("/courses/", course, auth());
  return res.data;
};

export const updateCourse = async (id, course) => {
  const res = await api.put(`/courses/${id}`, course, auth());
  return res.data;
};

export const deleteCourse = async (id) => {
  const res = await api.delete(`/courses/${id}`, auth());
  return res.data;
};