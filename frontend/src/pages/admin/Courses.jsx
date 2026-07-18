import { useEffect, useMemo, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";

import { getCourses } from "../../services/courseService";

import CourseHeader from "../../components/courses/CourseHeader";
import CourseStats from "../../components/courses/CourseStats";
import CourseToolbar from "../../components/courses/CourseToolbar";
import CourseTable from "../../components/courses/CourseTable";

import AddCourseModal from "../../components/courses/AddCourseModal";
import EditCourseModal from "../../components/courses/EditCourseModal";
import DeleteCourseModal from "../../components/courses/DeleteCourseModal";

function Courses() {

  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {

    try {

      setLoading(true);

      const data = await getCourses();

      setCourses(data);

    } catch (error) {

      console.log(error);

      alert("Failed To Load Courses");

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    let data = [...courses];

    if (search.trim()) {

      data = data.filter(

        (course) =>

          course.course_name
            .toLowerCase()
            .includes(search.toLowerCase())

          ||

          course.course_code
            .toLowerCase()
            .includes(search.toLowerCase())

      );

    }

    setFilteredCourses(data);

  }, [courses, search]);

  return (

    <DashboardLayout>

      {/* Header */}

      <CourseHeader
        onAdd={() => setShowAdd(true)}
      />

      {/* Stats */}

      <CourseStats
        courses={courses}
      />

      {/* Toolbar */}

      <CourseToolbar
        search={search}
        setSearch={setSearch}
        onRefresh={loadCourses}
      />

      {/* Table */}

      {

        loading ? (

          <div className="bg-white rounded-3xl shadow-xl p-16">

            <div className="flex flex-col items-center">

              <div className="animate-spin rounded-full h-14 w-14 border-4 border-blue-600 border-t-transparent"></div>

              <p className="mt-5 text-gray-500 text-lg">

                Loading Courses...

              </p>

            </div>

          </div>

        )

        :

        (

          <CourseTable

            courses={filteredCourses}

            onEdit={(course) => {

              setSelectedCourse(course);

              setShowEdit(true);

            }}

            onDelete={(course) => {

              setSelectedCourse(course);

              setShowDelete(true);

            }}

          />

        )

      }

      {/* Add */}

      {

        showAdd && (

          <AddCourseModal

            onClose={() => setShowAdd(false)}

            onSuccess={loadCourses}

          />

        )

      }

      {/* Edit */}

      {

        showEdit && (

          <EditCourseModal

            course={selectedCourse}

            onClose={() => setShowEdit(false)}

            onSuccess={loadCourses}

          />

        )

      }

      {/* Delete */}

      {

        showDelete && (

          <DeleteCourseModal

            course={selectedCourse}

            onClose={() => setShowDelete(false)}

            onSuccess={loadCourses}

          />

        )

      }

    </DashboardLayout>

  );

}

export default Courses;