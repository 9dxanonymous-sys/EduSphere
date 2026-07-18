import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Megaphone } from "lucide-react";

import { getMyEnrolledCourses } from "../../services/studentService";
import { getCourseAnnouncements } from "../../services/announcementService";

function StudentAnnouncementsPanel() {

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
              items.map((item) => ({
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
        )
        .slice(0, 4);

      setAnnouncements(merged);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  return (

    <motion.div

      initial={{ opacity: 0, x: 30 }}

      animate={{ opacity: 1, x: 0 }}

      className="bg-white rounded-3xl shadow-xl p-6"

    >

      <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
        <Megaphone className="text-blue-600" />
        Recent Announcements
      </h2>

      {

        loading ? (

          <p className="text-gray-500">Loading...</p>

        ) : announcements.length === 0 ? (

          <p className="text-gray-500">
            No announcements yet.
          </p>

        ) : (

          <div className="space-y-4">

            {

              announcements.map((item) => (

                <motion.div

                  key={item.id}

                  whileHover={{ scale: 1.02 }}

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

    </motion.div>

  );

}

export default StudentAnnouncementsPanel;