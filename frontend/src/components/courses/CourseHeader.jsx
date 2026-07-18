import { motion } from "framer-motion";
import { Plus, BookOpen } from "lucide-react";


function CourseHeader({ onAdd }) {

  return (

    <motion.div
      initial={{opacity:0,y:-20}}
      animate={{opacity:1,y:0}}
      className="mb-8"
    >

      <div className="bg-gradient-to-r from-indigo-700 via-blue-600 to-cyan-500 rounded-3xl shadow-xl p-8 text-white">

        <div className="flex flex-col lg:flex-row justify-between items-center">


          <div className="flex items-center gap-5">


            <div className="bg-white/20 p-4 rounded-2xl">

              <BookOpen size={38}/>

            </div>


            <div>

              <h1 className="text-4xl font-bold">
                Course Management
              </h1>


              <p className="text-blue-100 mt-2">
                Manage courses, credit hours and academic records.
              </p>

            </div>


          </div>




          <button
            onClick={onAdd}
            className="mt-5 lg:mt-0 flex items-center gap-2 bg-white text-blue-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition shadow"
          >

            <Plus size={20}/>

            Add Course

          </button>



        </div>


      </div>


    </motion.div>

  );

}


export default CourseHeader;