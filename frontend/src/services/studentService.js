import api from "../api/axios";

const auth = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getStudents = async () => {
  const res = await api.get("/students/", auth());
  return res.data;
};

export const addStudent = async (student) => {
  const res = await api.post("/students/", student, auth());
  return res.data;
};

export const updateStudent = async (id, student) => {
  const res = await api.put(`/students/${id}`, student, auth());
  return res.data;
};

export const deleteStudent = async (id) => {
  const res = await api.delete(`/students/${id}`, auth());
  return res.data;
};

export const searchStudents = async (search) => {
  const students = await getStudents();

  return students.filter((student) =>
    student.full_name.toLowerCase().includes(search.toLowerCase()) ||
    student.email.toLowerCase().includes(search.toLowerCase()) ||
    student.department.toLowerCase().includes(search.toLowerCase())
  );
};
export const enrollStudent = async (studentId, courseId) => {
  const res = await api.post(
    `/students/${studentId}/enroll/${courseId}`,
    {},
    auth()
  );

  return res.data;
};

export const getStudentCourses = async (studentId) => {
  const res = await api.get(
    `/students/${studentId}/courses`,
    auth()
  );

  return res.data;
};

export const removeEnrollment = async (studentId, courseId) => {
  const res = await api.delete(
    `/students/${studentId}/courses/${courseId}`,
    auth()
  );

  return res.data;
};

// =============== Student Self-Service ===============

export const getMyProfile = async () => {
  const res = await api.get("/students/profile", auth());
  return res.data;
};

export const getMyEnrolledCourses = async () => {
  const res = await api.get("/students/my-courses", auth());
  return res.data;
};

export const getMyDashboardStats = async () => {
  const res = await api.get("/students/dashboard-stats", auth());
  return res.data;
};

export const changeMyPassword = async (data) => {
  const res = await api.put("/students/change-password", data, auth());
  return res.data;
};