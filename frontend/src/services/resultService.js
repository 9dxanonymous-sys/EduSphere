import api from "../api/axios";


const auth = () => ({

  headers: {

    Authorization: `Bearer ${localStorage.getItem("token")}`,

  },

});



// Get all results of a course

export const getCourseResults = async (courseId) => {

  const res = await api.get(

    `/results/course/${courseId}`,

    auth()

  );

  return res.data;

};



// Add new result

export const createResult = async (result) => {

  const res = await api.post(

    "/results/",

    result,

    auth()

  );

  return res.data;

};



// Update result

export const updateResult = async (id, result) => {

  const res = await api.put(

    `/results/${id}`,

    result,

    auth()

  );

  return res.data;

};



// Delete result

export const deleteResult = async (id) => {

  const res = await api.delete(

    `/results/${id}`,

    auth()

  );

  return res.data;

};



// Get all results

export const getResults = async () => {

  const res = await api.get(

    "/results/",

    auth()

  );

  return res.data;

};



// Get student result

export const getStudentResult = async (studentId) => {

  const res = await api.get(

    `/results/student/${studentId}`,

    auth()

  );

  return res.data;

};



// Get student GPA

export const getStudentGPA = async (studentId) => {

  const res = await api.get(

    `/results/student/${studentId}/gpa`,

    auth()

  );

  return res.data;

};



// Get student CGPA

export const getStudentCGPA = async (studentId) => {

  const res = await api.get(

    `/results/student/${studentId}/cgpa`,

    auth()

  );

  return res.data;

};



// Get transcript

export const getTranscript = async (studentId) => {

  const res = await api.get(

    `/results/student/${studentId}/transcript`,

    auth()

  );

  return res.data;

};
// Get my own results (student self-view)
export const getMyResult = async () => {

  const res = await api.get(

    "/results/student/my",
    auth()

  );

  return res.data;

};

// Get my own GPA
export const getMyGPA = async () => {

  const res = await api.get(

    "/results/student/my/gpa",
    auth()

  );

  return res.data;

};

// Get my own CGPA
export const getMyCGPA = async () => {

  const res = await api.get(

    "/results/student/my/cgpa",
    auth()

  );

  return res.data;

};

// Get my own transcript
export const getMyTranscript = async () => {

  const res = await api.get(

    "/results/student/my/transcript",
    auth()

  );

  return res.data;

};
// Download my transcript as PDF
export const downloadMyTranscriptPdf = async () => {

  const res = await api.get(

    "/results/student/my/transcript/pdf",
    {
      ...auth(),
      responseType: "blob",
    }

  );

  const url = window.URL.createObjectURL(
    new Blob([res.data], { type: "application/pdf" })
  );

  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "Transcript.pdf");

  document.body.appendChild(link);
  link.click();
  link.remove();

  window.URL.revokeObjectURL(url);

};