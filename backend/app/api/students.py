from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.schemas.student import StudentCreate, StudentUpdate, ChangePassword
from app.database.database import get_db
from app.services.student_service import (
    create_student,
    get_students,
    enroll_student,
    get_student_courses,
    remove_enrollment,
    update_student,
    delete_student,
    get_my_profile,
    get_my_courses,
    get_dashboard_stats,
    change_student_password,
)
from app.core.dependencies import admin_required, student_required

router = APIRouter(
    prefix="/students",
    tags=["Students"]
)


# ---------------------------------------------------
# Static / collection routes (no path params)
# ---------------------------------------------------

@router.post("/")
def add_student(
    student: StudentCreate,
    db: Session = Depends(get_db),
    current_user=Depends(admin_required)
):
    return create_student(db, student)


@router.get("/")
def all_students(db: Session = Depends(get_db)):
    return get_students(db)


# ---------------------------------------------------
# Student self-service routes (MUST come before /{student_id})
# ---------------------------------------------------

@router.get("/profile")
def student_profile(
    db: Session = Depends(get_db),
    current_user=Depends(student_required)
):
    return get_my_profile(db, current_user)


@router.get("/my-courses")
def my_courses(
    db: Session = Depends(get_db),
    current_user=Depends(student_required)
):
    return get_my_courses(db, current_user)


@router.get("/dashboard-stats")
def student_dashboard_stats(
    db: Session = Depends(get_db),
    current_user=Depends(student_required)
):
    return get_dashboard_stats(db, current_user)


@router.put("/change-password")
def student_change_password(
    password: ChangePassword,
    db: Session = Depends(get_db),
    current_user=Depends(student_required)
):
    return change_student_password(db, current_user, password)


# ---------------------------------------------------
# Dynamic /{student_id} routes (MUST come last, with :int converter)
# ---------------------------------------------------

@router.post("/{student_id:int}/enroll/{course_id:int}")
def enroll(
    student_id: int,
    course_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(admin_required)
):
    return enroll_student(db, student_id, course_id)


@router.get("/{student_id:int}/courses")
def student_courses(
    student_id: int,
    db: Session = Depends(get_db)
):
    return get_student_courses(db, student_id)


@router.delete("/{student_id:int}/courses/{course_id:int}")
def unenroll_student(
    student_id: int,
    course_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(admin_required)
):
    return remove_enrollment(db, student_id, course_id)


@router.put("/{student_id:int}")
def edit_student(
    student_id: int,
    student: StudentUpdate,
    db: Session = Depends(get_db),
    current_user=Depends(admin_required)
):
    return update_student(db, student_id, student)


@router.delete("/{student_id:int}")
def remove_student(
    student_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(admin_required)
):
    return delete_student(db, student_id)