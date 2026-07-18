import api from "../api/axios";


const auth = () => ({

  headers: {

    Authorization: `Bearer ${localStorage.getItem("token")}`,

  },

});



// Get course announcements

export const getCourseAnnouncements = async(courseId)=>{

  const res = await api.get(

    `/announcements/course/${courseId}`,

    auth()

  );


  return res.data;

};




// Create announcement

export const createAnnouncement = async(data)=>{

  const res = await api.post(

    "/announcements/",

    data,

    auth()

  );


  return res.data;

};




// Delete announcement

export const deleteAnnouncement = async(id)=>{

  const res = await api.delete(

    `/announcements/${id}`,

    auth()

  );


  return res.data;

};