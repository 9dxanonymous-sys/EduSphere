from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.schemas.course import CourseCreate
from app.services.course_service import create_course
from app.services.course_service import create_course, get_courses
from app.core.dependencies import admin_required
from app.services.course_service import (
    create_course,
    get_courses,
    update_course,
    delete_course
)

router = APIRouter(
    prefix="/courses",
    tags=["Courses"]
)


@router.post("/")
def add_course(
    course: CourseCreate,
    db: Session = Depends(get_db),
    current_user=Depends(admin_required)
):
    return create_course(db, course)
@router.get("/")
def all_courses(db: Session = Depends(get_db)):
    return get_courses(db)
@router.put("/{course_id}")
def edit_course(
    course_id: int,
    course: CourseCreate,
    db: Session = Depends(get_db),
    current_user=Depends(admin_required)
):
    return update_course(db, course_id, course)
@router.delete("/{course_id}")
def remove_course(
    course_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(admin_required)
):
    return delete_course(db, course_id)
