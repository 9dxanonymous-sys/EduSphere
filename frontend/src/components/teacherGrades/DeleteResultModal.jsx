import { deleteResult } from "../../services/resultService";


function DeleteResultModal({

  result,

  onClose,

  onSuccess,

}){


  const handleDelete = async()=>{


    try{


      await deleteResult(result.id);


      alert("Result Deleted Successfully");


      onSuccess();

      onClose();


    }

    catch(error){

      console.log(error);

      alert("Failed To Delete Result");

    }


  };



  return (

    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">


      <div className="bg-white rounded-2xl p-8 w-[400px]">


        <h2 className="text-xl font-bold mb-4">

          Delete Result?

        </h2>


        <p className="text-gray-600 mb-6">

          Are you sure you want to delete this result?

        </p>



        <div className="flex justify-end gap-3">


          <button

            onClick={onClose}

            className="bg-gray-500 text-white px-5 py-2 rounded-lg"

          >

            Cancel

          </button>



          <button

            onClick={handleDelete}

            className="bg-red-600 text-white px-5 py-2 rounded-lg"

          >

            Delete

          </button>


        </div>


      </div>


    </div>

  );


}


export default DeleteResultModal;