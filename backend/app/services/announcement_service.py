from sqlalchemy.orm import Session

from app.models.announcement import Announcement
from app.models.course import Course
from app.schemas.announcement import AnnouncementCreate



def create_announcement(
    db: Session,
    announcement: AnnouncementCreate
):

    course = db.query(Course).filter(
        Course.id == announcement.course_id
    ).first()


    if not course:

        return {
            "error": "Course not found"
        }



    new_announcement = Announcement(

        title=announcement.title,

        message=announcement.message,

        course_id=announcement.course_id

    )


    db.add(new_announcement)

    db.commit()

    db.refresh(new_announcement)


    return new_announcement





def get_announcements(db: Session):

    return db.query(Announcement).all()





def get_course_announcements(
    db: Session,
    course_id: int
):

    return db.query(Announcement).filter(

        Announcement.course_id == course_id

    ).all()





def delete_announcement(
    db: Session,
    announcement_id: int
):

    announcement = db.query(Announcement).filter(

        Announcement.id == announcement_id

    ).first()



    if not announcement:

        return {
            "error": "Announcement not found"
        }



    db.delete(announcement)

    db.commit()


    return {
        "message": "Announcement deleted successfully"
    }