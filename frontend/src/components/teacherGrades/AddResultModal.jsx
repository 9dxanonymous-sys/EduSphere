import { useState } from "react";
import { createResult } from "../../services/resultService";


function AddResultModal({

  courseId,
  students,
  onClose,
  onSuccess,

}) {


  const [formData,setFormData] = useState({

    student_id: "",

    assignment_marks: "",

    attendance_marks: "",

    mid_marks: "",

    final_marks: "",

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


      await createResult({

        student_id: Number(formData.student_id),

        course_id: Number(courseId),

        assignment_marks: Number(formData.assignment_marks),

        attendance_marks: Number(formData.attendance_marks),

        mid_marks: Number(formData.mid_marks),

        final_marks: Number(formData.final_marks),

      });



      alert("Result Added Successfully");


      onSuccess();

      onClose();


    }

    catch(error){


      console.log(error);


      alert("Failed To Add Result");


    }

    finally{


      setLoading(false);


    }


  };





  return (

    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">


      <div className="bg-white rounded-2xl p-8 w-[600px]">


        <h2 className="text-2xl font-bold mb-6">

          Add Result

        </h2>




        <form onSubmit={handleSubmit}>




          <select

            name="student_id"

            value={formData.student_id}

            onChange={handleChange}

            className="w-full border rounded-lg p-3 mb-4"

            required

          >


            <option value="">

              Select Student

            </option>



            {

              students.map(student=>(


                <option

                  key={student.id}

                  value={student.id}

                >

                  {student.full_name}

                  {" - "}

                  {student.department}


                </option>


              ))

            }



          </select>







          <input

            type="number"

            name="assignment_marks"

            placeholder="Assignment Marks"

            value={formData.assignment_marks}

            onChange={handleChange}

            className="w-full border rounded-lg p-3 mb-4"

            required

          />





          <input

            type="number"

            name="attendance_marks"

            placeholder="Attendance Marks"

            value={formData.attendance_marks}

            onChange={handleChange}

            className="w-full border rounded-lg p-3 mb-4"

            required

          />






          <input

            type="number"

            name="mid_marks"

            placeholder="Mid Marks"

            value={formData.mid_marks}

            onChange={handleChange}

            className="w-full border rounded-lg p-3 mb-4"

            required

          />






          <input

            type="number"

            name="final_marks"

            placeholder="Final Marks"

            value={formData.final_marks}

            onChange={handleChange}

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

                : "Save Result"

              }


            </button>





          </div>





        </form>





      </div>





    </div>

  );

}



export default AddResultModal;