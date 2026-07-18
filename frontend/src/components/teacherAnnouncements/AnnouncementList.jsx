function AnnouncementList({

  announcements,

  onDelete,

}) {



  return (


    <div className="grid grid-cols-1 gap-5">



      {
        announcements.length === 0 ? (


          <div className="bg-white rounded-2xl shadow p-6 text-gray-500">

            No announcements available

          </div>


        ) : (


          announcements.map((item)=>(


            <div

              key={item.id}

              className="bg-white rounded-2xl shadow p-6"

            >



              <div className="flex justify-between items-start">



                <div>


                  <h2 className="text-xl font-bold">

                    {item.title}

                  </h2>



                  <p className="text-gray-600 mt-3">

                    {item.message}

                  </p>



                  <p className="text-sm text-gray-400 mt-4">

                    {
                      item.created_at
                      ? new Date(item.created_at).toLocaleDateString()
                      : ""
                    }

                  </p>



                </div>






                <button

                  onClick={()=>onDelete(item.id)}

                  className="bg-red-600 text-white px-4 py-2 rounded-lg"

                >

                  Delete

                </button>



              </div>




            </div>


          ))


        )
      }



    </div>


  );

}



export default AnnouncementList;