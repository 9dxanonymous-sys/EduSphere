import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

import {
  Users,
  Search,
  UserCircle2,
  GraduationCap,
  Building2,
} from "lucide-react";

import { getCourseStudents } from "../../../services/teacherService";


function CourseStudents() {


  const { id } = useParams();


  const [students, setStudents] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");



  useEffect(() => {

    loadStudents();

  }, []);



  const loadStudents = async () => {

    try {

      const data = await getCourseStudents(id);

      setStudents(data);

    }

    catch(error){

      console.log(error);

    }

    finally{

      setLoading(false);

    }

  };



  const filteredStudents = useMemo(()=>{

    return students.filter((student)=>

      student.full_name
      ?.toLowerCase()
      .includes(search.toLowerCase())

      ||

      student.department
      ?.toLowerCase()
      .includes(search.toLowerCase())

    );

  },[students,search]);




  if(loading){

    return(

      <div className="flex justify-center items-center h-72">

        <h2 className="text-xl font-semibold text-gray-500">

          Loading Students...

        </h2>

      </div>

    );

  }




  return(

    <div className="space-y-8">


      {/* Header */}

      <motion.div

        initial={{opacity:0,y:-20}}

        animate={{opacity:1,y:0}}

        className="flex flex-col lg:flex-row justify-between gap-5"

      >


        <div>


          <h1 className="text-4xl font-bold text-gray-800 flex items-center gap-3">

            <Users className="text-blue-600"/>

            Course Students

          </h1>


          <p className="text-gray-500 mt-2">

            View and manage enrolled students.

          </p>


        </div>




        <div className="relative w-full lg:w-80">


          <Search

            size={18}

            className="absolute left-4 top-3.5 text-gray-400"

          />


          <input

            type="text"

            placeholder="Search student..."

            value={search}

            onChange={(e)=>setSearch(e.target.value)}

            className="
            w-full
            rounded-2xl
            border
            bg-white
            pl-11
            pr-4
            py-3
            outline-none
            focus:ring-2
            focus:ring-blue-500
            "

          />


        </div>


      </motion.div>





      {/* Premium Stats Cards */}


      <div className="grid md:grid-cols-3 gap-6">



        {/* Total Students */}


        <motion.div

          whileHover={{y:-5}}

          className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-3xl shadow-xl p-6 text-white"

        >


          <div className="flex justify-between items-center">


            <div>


              <p className="text-blue-100">

                Total Students

              </p>


              <h2 className="text-5xl font-bold mt-2">

                {students.length}

              </h2>


              <p className="mt-3 text-blue-100">

                Enrolled Students

              </p>


            </div>


            <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur">


              <Users size={34}/>


            </div>


          </div>


        </motion.div>





        {/* Departments */}



        <motion.div

          whileHover={{y:-5}}

          className="bg-gradient-to-r from-green-600 to-emerald-500 rounded-3xl shadow-xl p-6 text-white"

        >


          <div className="flex justify-between items-center">


            <div>


              <p className="text-green-100">

                Departments

              </p>


              <h2 className="text-5xl font-bold mt-2">


                {
                  [...new Set(
                    students.map(s=>s.department)
                  )].length
                }


              </h2>


              <p className="mt-3 text-green-100">

                Active Departments

              </p>


            </div>


            <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur">


              <Building2 size={34}/>


            </div>


          </div>


        </motion.div>





        {/* Semesters */}



        <motion.div

          whileHover={{y:-5}}

          className="bg-gradient-to-r from-purple-600 to-fuchsia-500 rounded-3xl shadow-xl p-6 text-white"

        >


          <div className="flex justify-between items-center">


            <div>


              <p className="text-purple-100">

                Semesters

              </p>


              <h2 className="text-5xl font-bold mt-2">


                {
                  [...new Set(
                    students.map(s=>s.semester)
                  )].length
                }


              </h2>


              <p className="mt-3 text-purple-100">

                Academic Levels

              </p>


            </div>


            <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur">


              <GraduationCap size={34}/>


            </div>


          </div>


        </motion.div>



      </div>






      {/* Students Table */}



      <div className="bg-white rounded-3xl shadow-xl overflow-hidden">


        <table className="w-full">


          <thead className="bg-slate-900 text-white">


            <tr>


              <th className="px-6 py-4 text-left">

                Student

              </th>


              <th className="px-6 py-4 text-left">

                Department

              </th>


              <th className="px-6 py-4 text-left">

                Semester

              </th>


              <th className="px-6 py-4 text-left">

                Status

              </th>


            </tr>


          </thead>




          <tbody>


          {
            filteredStudents.length === 0 ?


            (

              <tr>

                <td

                colSpan="4"

                className="py-14 text-center text-gray-500"

                >

                  No Students Found

                </td>

              </tr>

            )

            :

            filteredStudents.map((student)=>(


              <tr

              key={student.id}

              className="border-b hover:bg-blue-50 transition"

              >


                <td className="px-6 py-5">


                  <div className="flex items-center gap-4">


                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center text-white">


                      <UserCircle2 size={28}/>


                    </div>



                    <div>


                      <h3 className="font-semibold">

                        {student.full_name}

                      </h3>


                      <p className="text-sm text-gray-500">

                        ID #{student.id}

                      </p>


                    </div>


                  </div>


                </td>




                <td className="px-6 py-5">

                  {student.department}

                </td>




                <td className="px-6 py-5">

                  Semester {student.semester}

                </td>




                <td className="px-6 py-5">


                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">

                    Active

                  </span>


                </td>


              </tr>


            ))

          }


          </tbody>


        </table>


      </div>


    </div>


  );

}


export default CourseStudents;