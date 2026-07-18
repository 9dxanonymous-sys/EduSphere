import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

import {
  Search,
  BookOpen,
  GraduationCap,
} from "lucide-react";

import CourseCard from "../../components/studentCourses/CourseCard";

import { getMyEnrolledCourses } from "../../services/studentService";

function StudentCourses() {

  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {

    try {

      const data = await getMyEnrolledCourses();
      setCourses(data.courses || []);

    } catch (error) {

      console.log(error);

    }

  };

  const filteredCourses = useMemo(() => {

    return courses.filter((course) =>
      course.course_name
        .toLowerCase()
        .includes(search.toLowerCase())
      ||
      course.course_code
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  }, [courses, search]);

  const totalCreditHours = courses.reduce(
    (sum, item) => sum + (item.credit_hours || 0),
    0
  );

  return (

    <div className="space-y-8">

      {/* Header */}

      <motion.div

        initial={{ opacity: 0, y: -20 }}

        animate={{ opacity: 1, y: 0 }}

        className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-5"

      >

        <div>

          <h1 className="text-4xl font-bold text-gray-800">
            My Courses
          </h1>

          <p className="text-gray-500 mt-2">
            View all courses you are enrolled in.
          </p>

        </div>

        <div className="relative w-full lg:w-80">

          <Search
            size={18}
            className="absolute left-4 top-3.5 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search course..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white rounded-2xl border pl-11 pr-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />

        </div>

      </motion.div>

      {/* Stats */}

      <div className="grid md:grid-cols-2 gap-6">

        <div className="bg-white rounded-3xl shadow-lg p-6">

          <div className="flex justify-between items-center">

            <div>
              <p className="text-gray-500">
                Total Courses
              </p>
              <h2 className="text-4xl font-bold mt-2">
                {courses.length}
              </h2>
            </div>

            <div className="bg-blue-100 p-4 rounded-2xl">
              <BookOpen className="text-blue-600"/>
            </div>

          </div>

        </div>

        <div className="bg-white rounded-3xl shadow-lg p-6">

          <div className="flex justify-between items-center">

            <div>
              <p className="text-gray-500">
                Credit Hours
              </p>
              <h2 className="text-4xl font-bold mt-2">
                {totalCreditHours}
              </h2>
            </div>

            <div className="bg-green-100 p-4 rounded-2xl">
              <GraduationCap className="text-green-600"/>
            </div>

          </div>

        </div>

      </div>

      {/* Courses */}

      {

        filteredCourses.length === 0 ? (

          <div className="bg-white rounded-3xl shadow-lg p-20 text-center">

            <BookOpen
              size={70}
              className="mx-auto text-gray-300"
            />

            <h2 className="text-2xl font-bold mt-6">
              No Courses Found
            </h2>

            <p className="text-gray-500 mt-2">
              Try another search keyword.
            </p>

          </div>

        ) : (

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

            {

              filteredCourses.map((course) => (

                <CourseCard
                  key={course.id}
                  course={course}
                />

              ))

            }

          </div>

        )

      }

    </div>

  );

}

export default StudentCourses;