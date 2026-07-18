import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Megaphone } from "lucide-react";

import { getCourseAnnouncements } from "../../../services/announcementService";
import AnnouncementList from "../../../components/studentAnnouncements/AnnouncementList";

function Announcements() {

  const { id } = useParams();

  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnnouncements();
  }, []);

  const loadAnnouncements = async () => {

    try {

      const data = await getCourseAnnouncements(id);
      setAnnouncements(data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  if (loading) {

    return (
      <div className="flex justify-center items-center h-64">
        <h2 className="text-xl">Loading Announcements...</h2>
      </div>
    );

  }

  return (

    <div>

      <div className="mb-8">

        <h1 className="text-3xl font-bold flex items-center gap-3">
          <Megaphone className="text-blue-600"/>
          Announcements
        </h1>

        <p className="text-gray-500 mt-2">
          Total Announcements : {announcements.length}
        </p>

      </div>

      <AnnouncementList announcements={announcements} />

    </div>

  );

}

export default Announcements;