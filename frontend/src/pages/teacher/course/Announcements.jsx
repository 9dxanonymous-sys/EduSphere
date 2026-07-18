import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Megaphone } from "lucide-react";

import {
  getCourseAnnouncements,
  deleteAnnouncement,
} from "../../../services/announcementService";

import AddAnnouncementModal from "../../../components/teacherAnnouncements/AddAnnouncementModal";
import AnnouncementList from "../../../components/teacherAnnouncements/AnnouncementList";

function Announcements() {

  const { id } = useParams();

  const [announcements, setAnnouncements] = useState([]);

  const [loading, setLoading] = useState(true);

  const [showAdd, setShowAdd] = useState(false);

  useEffect(() => {

    loadAnnouncements();

  }, []);

  const loadAnnouncements = async () => {

    try {

      const data = await getCourseAnnouncements(id);

      setAnnouncements(data);

    }

    catch (error) {

      console.log(error);

    }

    finally {

      setLoading(false);

    }

  };

  const handleDelete = async (announcementId) => {

    if (!window.confirm("Delete this announcement?"))
      return;

    try {

      await deleteAnnouncement(announcementId);

      loadAnnouncements();

    }

    catch (error) {

      console.log(error);
      alert("Failed to delete announcement");

    }

  };

  if (loading) {

    return (

      <div className="flex justify-center items-center h-64">

        <h2 className="text-xl">

          Loading Announcements...

        </h2>

      </div>

    );

  }

  return (

    <div>

      <div className="flex justify-between items-center mb-8">

        <div>

          <h1 className="text-3xl font-bold flex items-center gap-3">

            <Megaphone className="text-blue-600"/>

            Announcements

          </h1>

          <p className="text-gray-500 mt-2">

            Total Announcements : {announcements.length}

          </p>

        </div>

        <button

          onClick={() => setShowAdd(true)}

          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl"

        >

          + New Announcement

        </button>

      </div>

      <AnnouncementList

        announcements={announcements}

        onDelete={handleDelete}

      />

      {

        showAdd &&

        <AddAnnouncementModal

          courseId={id}

          onClose={() => setShowAdd(false)}

          onSuccess={loadAnnouncements}

        />

      }

    </div>

  );

}

export default Announcements;