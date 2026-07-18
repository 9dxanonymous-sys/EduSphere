import { useState } from "react";

import {
  createAnnouncement
} from "../../services/announcementService";



function AddAnnouncementModal({

  courseId,

  onClose,

  onSuccess,

}) {



  const [formData,setFormData] = useState({

    title:"",

    message:"",

  });



  const [loading,setLoading] = useState(false);





  const handleChange = (e)=>{


    setFormData({

      ...formData,

      [e.target.name]:e.target.value

    });


  };







  const handleSubmit = async(e)=>{


    e.preventDefault();


    setLoading(true);



    try{


      await createAnnouncement({

        title:formData.title,

        message:formData.message,

        course_id:Number(courseId)

      });




      alert("Announcement Added Successfully");


      onSuccess();

      onClose();



    }

    catch(error){


      console.log(error);


      alert("Failed To Add Announcement");


    }

    finally{


      setLoading(false);


    }


  };






  return (


    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">



      <div className="bg-white rounded-2xl p-8 w-[600px]">


        <h2 className="text-2xl font-bold mb-6">

          Add Announcement

        </h2>




        <form onSubmit={handleSubmit}>



          <input

            type="text"

            name="title"

            value={formData.title}

            onChange={handleChange}

            placeholder="Announcement Title"

            className="w-full border rounded-lg p-3 mb-4"

            required

          />






          <textarea

            name="message"

            value={formData.message}

            onChange={handleChange}

            placeholder="Announcement Message"

            rows="5"

            className="w-full border rounded-lg p-3 mb-6"

            required

          />







          <div className="flex justify-end gap-3">



            <button

              type="button"

              onClick={onClose}

              className="bg-gray-500 text-white px-5 py-2 rounded-lg"

            >

              Cancel

            </button>






            <button

              type="submit"

              disabled={loading}

              className="bg-blue-600 text-white px-5 py-2 rounded-lg"

            >


              {

                loading

                ? "Saving..."

                : "Save"

              }


            </button>



          </div>




        </form>



      </div>



    </div>


  );

}



export default AddAnnouncementModal;