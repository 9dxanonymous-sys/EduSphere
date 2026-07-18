import api from "../api/axios";

const auth = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getCourseAssignments = async (courseId) => {
  const res = await api.get(
    `/assignments/course/${courseId}`,
    auth()
  );

  return res.data;
};

export const createAssignment = async (assignment) => {
  const res = await api.post(
    "/assignments/",
    assignment,
    auth()
  );

  return res.data;
};

export const updateAssignment = async (id, assignment) => {
  const res = await api.put(
    `/assignments/${id}`,
    assignment,
    auth()
  );

  return res.data;
};

export const deleteAssignment = async (id) => {
  const res = await api.delete(
    `/assignments/${id}`,
    auth()
  );

  return res.data;
};

// =============== Student Self-Service ===============

export const getMyCourseAssignments = async (courseId) => {
  const res = await api.get(
    `/assignments/course/${courseId}/my`,
    auth()
  );

  return res.data;
};

export const submitAssignment = async (data) => {
  const res = await api.post(
    "/submissions/",
    data,
    auth()
  );

  return res.data;
};

export const getMySubmissions = async () => {
  const res = await api.get(
    "/submissions/student/my",
    auth()
  );

  return res.data;
};