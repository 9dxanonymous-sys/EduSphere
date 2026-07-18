import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Megaphone } from "lucide-react";

import { getMyEnrolledCourses } from "../../services/studentService";
import { getCourseAnnouncements } from "../../services/announcementService";

function StudentAnnouncementsAll() {

  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnnouncements();
  }, []);

  const loadAnnouncements = async () => {

    try {

      const data = await getMyEnrolledCourses();
      const courses = data.courses || [];

      const results = await Promise.all(
        courses.map((course) =>
          getCourseAnnouncements(course.id)
            .then((items) =>
              (items || []).map((item) => ({
                ...item,
                course_name: course.course_name,
              }))
            )
            .catch(() => [])
        )
      );

      const merged = results
        .flat()
        .sort(
          (a, b) =>
            new Date(b.created_at) - new Date(a.created_at)
        );

      setAnnouncements(merged);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  if (loading) {

    return (
      <div className="flex justify-center items-center h-72">
        <h2 className="text-xl font-semibold text-gray-500">
          Loading Announcements...
        </h2>
      </div>
    );

  }

  return (

    <div className="space-y-8">

      <div className="bg-gradient-to-r from-blue-700 via-indigo-600 to-cyan-500 rounded-3xl shadow-xl p-8 text-white">

        <div className="flex items-center gap-4">

          <div className="bg-white/20 p-4 rounded-2xl">
            <Megaphone size={38} />
          </div>

          <div>
            <h1 className="text-3xl font-bold">
              Announcements
            </h1>
            <p className="text-blue-100 mt-2">
              Updates from all your enrolled courses.
            </p>
          </div>

        </div>

      </div>

      <div className="bg-white rounded-3xl shadow-xl p-6">

        {

          announcements.length === 0 ? (

            <p className="text-gray-500 text-center py-10">
              No announcements yet.
            </p>

          ) : (

            <div className="space-y-4">

              {

                announcements.map((item) => (

                  <motion.div

                    key={item.id}

                    whileHover={{ scale: 1.01 }}

                    className="bg-gray-50 rounded-2xl p-4"

                  >

                    <div className="flex justify-between items-start">

                      <h3 className="font-bold">
                        {item.title}
                      </h3>

                      <span className="text-xs text-gray-400">
                        {item.course_name}
                      </span>

                    </div>

                    <p className="text-gray-600 mt-2 text-sm">
                      {item.message}
                    </p>

                  </motion.div>

                ))

              }

            </div>

          )

        }

      </div>

    </div>

  );

}

export default StudentAnnouncementsAll;