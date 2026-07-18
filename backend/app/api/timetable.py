from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.schemas.timetable import TimetableCreate
from app.services.timetable_service import (
    create_timetable_entry,
    get_all_timetable,
    get_course_timetable,
    get_teacher_timetable,
    get_student_timetable,
    update_timetable_entry,
    delete_timetable_entry,
)
from app.core.dependencies import (
    admin_or_teacher_required,
    teacher_required,
    student_required,
)

router = APIRouter(
    prefix="/timetable",
    tags=["Timetable"]
)


# ---------------------------------------------------
# Static / specific routes (MUST come before /{entry_id})
# ---------------------------------------------------

@router.get("/")
def all_timetable(
    db: Session = Depends(get_db),
    current_user=Depends(admin_or_teacher_required)
):
    return get_all_timetable(db)


@router.get("/teacher/my")
def my_teacher_timetable(
    db: Session = Depends(get_db),
    current_user=Depends(teacher_required)
):
    return get_teacher_timetable(db, current_user)


@router.get("/student/my")
def my_student_timetable(
    db: Session = Depends(get_db),
    current_user=Depends(student_required)
):
    return get_student_timetable(db, current_user)


@router.get("/course/{course_id:int}")
def course_timetable(
    course_id: int,
    db: Session = Depends(get_db)
):
    return get_course_timetable(db, course_id)


@router.post("/")
def add_timetable_entry(
    entry: TimetableCreate,
    db: Session = Depends(get_db),
    current_user=Depends(admin_or_teacher_required)
):
    return create_timetable_entry(db, entry)


# ---------------------------------------------------
# Dynamic /{entry_id} routes (MUST come last, with :int converter)
# ---------------------------------------------------

@router.put("/{entry_id:int}")
def edit_timetable_entry(
    entry_id: int,
    entry: TimetableCreate,
    db: Session = Depends(get_db),
    current_user=Depends(admin_or_teacher_required)
):
    return update_timetable_entry(db, entry_id, entry)


@router.delete("/{entry_id:int}")
def remove_timetable_entry(
    entry_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(admin_or_teacher_required)
):
    return delete_timetable_entry(db, entry_id)
