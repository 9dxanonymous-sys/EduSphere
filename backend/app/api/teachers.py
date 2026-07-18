from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.dependencies import (
    admin_required,
    get_current_user,
    teacher_required
)
from app.models.user import User
from app.core.security import (
    verify_password,
    hash_password,
)

from app.schemas.teacher import (
    TeacherCreate,
    TeacherUpdate,
    TeacherProfileUpdate,
    ChangePassword,
)

from app.database.database import get_db

from app.schemas.teacher import (
    TeacherCreate,
    TeacherProfileUpdate,
    ChangePassword,
)

from app.models.teacher import Teacher
from app.models.course import Course
from app.models.assignment import Assignment
from app.models.announcement import Announcement


from app.services.teacher_service import (
    create_teacher,
    get_teachers,
    update_teacher,
    delete_teacher,
    assign_course,
    get_teacher_courses,
    update_teacher_profile,
    change_teacher_password,
)


router = APIRouter(
    prefix="/teachers",
    tags=["Teachers"]
)


# ---------------------------------------------------
# Static / collection routes (no path params)
# ---------------------------------------------------

@router.post("/")
def add_teacher(
    teacher: TeacherCreate,
    db: Session = Depends(get_db),
    current_user=Depends(admin_required)
):
    return create_teacher(db, teacher)


@router.get("/")
def all_teachers(
    db: Session = Depends(get_db)
):
    return get_teachers(db)


# ---------------------------------------------------
# Specific named routes (MUST come before /{teacher_id})
# ---------------------------------------------------

@router.get("/my-courses")
def my_courses(
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db)
):
    teacher = db.query(Teacher).filter(
        Teacher.user_id == current_user.id
    ).first()

    if not teacher:
        return {"error": "Teacher profile not found"}

    courses_data = [
        {
            "id": course.id,
            "course_code": course.course_code,
            "course_name": course.course_name,
            "credit_hours": course.credit_hours,
            "students": len(course.students),
        }
        for course in teacher.courses
    ]

    return {
        "teacher_id": teacher.id,
        "teacher": teacher.full_name,
        "courses": courses_data
    }


@router.get("/courses/{course_id}/students")
def get_course_students(
    course_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    course = db.query(Course).filter(
        Course.id == course_id
    ).first()

    if not course:
        raise HTTPException(status_code=404, detail="Course not found")

    return [
        {
            "id": student.id,
            "full_name": student.full_name,
            "department": student.department,
            "semester": student.semester
        }
        for student in course.students
    ]


@router.get("/profile")
def teacher_profile(
    db: Session = Depends(get_db),
    current_user=Depends(teacher_required)
):
    teacher = db.query(Teacher).filter(
        Teacher.user_id == current_user.id
    ).first()

    if not teacher:
        return {"error": "Teacher profile not found"}

    return {
        "id": teacher.id,
        "full_name": teacher.full_name,
        "email": teacher.email,
        "department": teacher.department,
        "user_id": teacher.user_id
    }


@router.get("/dashboard-stats")
def teacher_dashboard_stats(
    db: Session = Depends(get_db),
    current_user=Depends(teacher_required)
):
    teacher = db.query(Teacher).filter(
        Teacher.user_id == current_user.id
    ).first()

    if not teacher:
        return {"error": "Teacher profile not found"}

    courses = teacher.courses
    course_ids = [course.id for course in courses]

    students_count = 0
    for course in courses:
        students_count += len(course.students)

    assignments_count = db.query(Assignment).filter(
        Assignment.course_id.in_(course_ids)
    ).count() if course_ids else 0

    announcements_count = db.query(Announcement).filter(
        Announcement.course_id.in_(course_ids)
    ).count() if course_ids else 0

    return {
        "courses": len(courses),
        "students": students_count,
        "assignments": assignments_count,
        "announcements": announcements_count
    }


@router.put("/profile")
def edit_my_profile(
    profile: TeacherProfileUpdate,
    db: Session = Depends(get_db),
    current_user=Depends(teacher_required)
):
    return update_teacher_profile(db, current_user, profile)


@router.put("/change-password")
def change_my_password(
    password: ChangePassword,
    db: Session = Depends(get_db),
    current_user=Depends(teacher_required)
):
    return change_teacher_password(db, current_user, password)


# ---------------------------------------------------
# Dynamic /{teacher_id} routes (MUST come last, with :int converter)
# ---------------------------------------------------

@router.get("/{teacher_id:int}/courses")
def teacher_courses_list(
    teacher_id: int,
    db: Session = Depends(get_db)
):
    return get_teacher_courses(db, teacher_id)


@router.put("/{teacher_id:int}")
def edit_teacher(
    teacher_id: int,
    teacher: TeacherUpdate,          # <-- fix
    db: Session = Depends(get_db),
    current_user=Depends(admin_required)
):
    return update_teacher(db, teacher_id, teacher)


@router.delete("/{teacher_id:int}")
def remove_teacher(
    teacher_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(admin_required)
):
    return delete_teacher(db, teacher_id)


@router.post("/{teacher_id:int}/assign-course/{course_id:int}")
def assign_teacher_course(
    teacher_id: int,
    course_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(admin_required)
):
    return assign_course(db, teacher_id, course_id)