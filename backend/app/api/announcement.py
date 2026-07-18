from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session


from app.database.database import get_db

from app.schemas.announcement import AnnouncementCreate

from app.services.announcement_service import (
    create_announcement,
    get_announcements,
    get_course_announcements,
    delete_announcement
)

from app.core.dependencies import teacher_required



router = APIRouter(

    prefix="/announcements",

    tags=["Announcements"]

)





@router.post("/")
def add_announcement(

    announcement: AnnouncementCreate,

    db: Session = Depends(get_db),

    current_user = Depends(teacher_required)

):

    return create_announcement(
        db,
        announcement
    )






@router.get("/")
def all_announcements(

    db: Session = Depends(get_db)

):

    return get_announcements(db)







@router.get("/course/{course_id}")
def course_announcements(

    course_id:int,

    db: Session = Depends(get_db)

):

    return get_course_announcements(

        db,

        course_id

    )







@router.delete("/{announcement_id}")
def remove_announcement(

    announcement_id:int,

    db: Session = Depends(get_db),

    current_user = Depends(teacher_required)

):

    return delete_announcement(

        db,

        announcement_id

    )