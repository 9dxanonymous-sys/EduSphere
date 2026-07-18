import { useState } from "react";
import { updateResult } from "../../services/resultService";


function EditResultModal({
  result,
  onClose,
  onSuccess,
}) {


  const [formData,setFormData] = useState({

    student_id: result.student_id,
    assignment_marks: result.assignment_marks,
    attendance_marks: result.attendance_marks,
    mid_marks: result.mid_marks,
    final_marks: result.final_marks,

  });


  const [loading,setLoading] = useState(false);



  const handleChange = (e)=>{

    setFormData({

      ...formData,

      [e.target.name]: e.target.value

    });

  };



  const handleSubmit = async(e)=>{

    e.preventDefault();

    setLoading(true);


    try{


      await updateResult(

        result.id,

        {

          student_id:Number(formData.student_id),

          course_id:result.course_id,

          assignment_marks:Number(formData.assignment_marks),

          attendance_marks:Number(formData.attendance_marks),

          mid_marks:Number(formData.mid_marks),

          final_marks:Number(formData.final_marks),

        }

      );


      alert("Result Updated Successfully");

      onSuccess();

      onClose();


    }

    catch(error){

      console.log(error);

      alert("Failed To Update Result");

    }

    finally{

      setLoading(false);

    }


  };



  return (

    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">


      <div className="bg-white rounded-2xl p-8 w-[600px]">


        <h2 className="text-2xl font-bold mb-6">
          Edit Result
        </h2>



        <form onSubmit={handleSubmit}>


          {
            Object.keys(formData).map((field)=>(

              field !== "student_id" &&

              <input

                key={field}

                type="number"

                name={field}

                value={formData[field]}

                onChange={handleChange}

                placeholder={field.replace("_"," ")}

                className="w-full border rounded-lg p-3 mb-4"

              />

            ))
          }



          <div className="flex justify-end gap-3">


            <button

              type="button"

              onClick={onClose}

              className="bg-gray-500 text-white px-5 py-2 rounded-lg"

            >

              Cancel

            </button>



            <button

              disabled={loading}

              className="bg-blue-600 text-white px-5 py-2 rounded-lg"

            >

              {
                loading
                ? "Updating..."
                : "Update"
              }

            </button>


          </div>



        </form>


      </div>


    </div>

  );

}


export default EditResultModal;