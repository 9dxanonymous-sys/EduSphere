from sqlalchemy.orm import Session

from app.models.student import Student
from app.models.attendance import Attendance
from app.models.assignment import Assignment
from app.models.submission import Submission
from app.models.user import User
from app.models.course import Course
from app.models.result import Result

from app.schemas.student import (
    StudentCreate,
    StudentUpdate,
    ChangePassword
)

from app.core.security import (
    hash_password,
    verify_password
)

from app.services.result_service import get_student_cgpa

def create_student(db: Session, student: StudentCreate):

    print("CREATE STUDENT — raw password received:", repr(student.password))

    # Check if email already exists
    existing_user = db.query(User).filter(
        User.email == student.email
    ).first()

    if existing_user:
        return {"error": "Email already exists"}

    # Create login account
    hashed = hash_password(student.password)

    print("CREATE STUDENT — hash generated:", hashed)
    print("CREATE STUDENT — self-check verify:", verify_password(student.password, hashed))

    new_user = User(
        username=student.email,
        email=student.email,
        password=hashed,
        role="student"
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    # Create student profile
    new_student = Student(
        full_name=student.full_name,
        email=student.email,
        semester=student.semester,
        department=student.department,
        user_id=new_user.id
    )

    db.add(new_student)
    db.commit()
    db.refresh(new_student)

    return new_student


def get_students(db: Session):
    return db.query(Student).all()


def enroll_student(db: Session, student_id: int, course_id: int):

    student = db.query(Student).filter(
        Student.id == student_id
    ).first()

    course = db.query(Course).filter(
        Course.id == course_id
    ).first()

    if not student:
        return {"error": "Student not found"}

    if not course:
        return {"error": "Course not found"}

    if course in student.courses:
        return {"message": "Student already enrolled"}

    student.courses.append(course)

    db.commit()
    db.refresh(student)

    return {
        "message": "Student enrolled successfully"
    }


def get_student_courses(db: Session, student_id: int):

    student = db.query(Student).filter(
        Student.id == student_id
    ).first()

    if not student:
        return {"error": "Student not found"}

    return {
        "student": student.full_name,
        "courses": student.courses
    }


def remove_enrollment(db: Session, student_id: int, course_id: int):

    student = db.query(Student).filter(
        Student.id == student_id
    ).first()

    if not student:
        return {"error": "Student not found"}

    course = db.query(Course).filter(
        Course.id == course_id
    ).first()

    if not course:
        return {"error": "Course not found"}

    if course not in student.courses:
        return {
            "error": "Student is not enrolled in this course"
        }

    student.courses.remove(course)

    db.commit()

    return {
        "message": "Enrollment removed successfully"
    }


def update_student(
    db: Session,
    student_id: int,
    student: StudentUpdate
):

    existing_student = db.query(Student).filter(
        Student.id == student_id
    ).first()

    if not existing_student:
        return {"error": "Student not found"}

    existing_student.full_name = student.full_name
    existing_student.email = student.email
    existing_student.semester = student.semester
    existing_student.department = student.department

    db.commit()
    db.refresh(existing_student)

    return existing_student

def delete_student(db: Session, student_id: int):

    student = db.query(Student).filter(
        Student.id == student_id
    ).first()

    if not student:
        return {
            "error": "Student not found"
        }

    try:

        # Delete all attendance records
        db.query(Attendance).filter(
            Attendance.student_id == student.id
        ).delete()

        # Delete all assignment submissions
        db.query(Submission).filter(
            Submission.student_id == student.id
        ).delete()

        # Delete all result records
        db.query(Result).filter(
            Result.student_id == student.id
        ).delete()

        # Remove all course enrollments
        student.courses.clear()

        # Get linked user account
        user = student.user

        # Delete student profile
        db.delete(student)

        # Delete login account
        if user:
            db.delete(user)

        # Save changes
        db.commit()

        return {
            "message": "Student deleted successfully"
        }

    except Exception as e:

        db.rollback()

        print("DELETE STUDENT ERROR:", e)

        return {
            "error": str(e)
        }

def _get_student_by_user(db: Session, current_user):

    return db.query(Student).filter(
        Student.user_id == current_user.id
    ).first()


def get_my_profile(db: Session, current_user):

    student = _get_student_by_user(
        db,
        current_user
    )

    if not student:
        return {"error": "Student profile not found"}

    return {
        "id": student.id,
        "full_name": student.full_name,
        "email": student.email,
        "semester": student.semester,
        "department": student.department,
        "user_id": student.user_id
    }


def get_my_courses(db: Session, current_user):

    student = _get_student_by_user(
        db,
        current_user
    )

    if not student:
        return {"error": "Student profile not found"}

    courses_data = [
        {
            "id": course.id,
            "course_code": course.course_code,
            "course_name": course.course_name,
            "credit_hours": course.credit_hours,
            "teachers": [teacher.full_name for teacher in course.teachers],
        }
        for course in student.courses
    ]

    return {
        "student_id": student.id,
        "student": student.full_name,
        "courses": courses_data
    }


def get_dashboard_stats(db: Session, current_user):

    student = _get_student_by_user(
        db,
        current_user
    )

    if not student:
        return {"error": "Student profile not found"}

    total_courses = len(student.courses)

    attendance_records = db.query(Attendance).filter(
        Attendance.student_id == student.id
    ).all()

    total_attendance = len(attendance_records)

    present_attendance = len(
        [record for record in attendance_records if record.present]
    )

    attendance_percentage = round(
        (present_attendance / total_attendance) * 100,
        1
    ) if total_attendance else 0

    course_ids = [
        course.id for course in student.courses
    ]

    assignments = (
        db.query(Assignment)
        .filter(
            Assignment.course_id.in_(course_ids)
        )
        .all()
    ) if course_ids else []

    submitted_ids = {
        submission.assignment_id
        for submission in (
            db.query(Submission)
            .filter(
                Submission.student_id == student.id
            )
            .all()
        )
    }

    pending_assignments = len(
        [
            assignment
            for assignment in assignments
            if assignment.id not in submitted_ids
        ]
    )

    cgpa_data = get_student_cgpa(
        db,
        student.id
    )

    return {
        "total_courses": total_courses,
        "attendance_percentage": attendance_percentage,
        "pending_assignments": pending_assignments,
        "cgpa": cgpa_data.get("cgpa", 0)
    }


def change_student_password(
    db: Session,
    current_user,
    password_data: ChangePassword
):

    user = db.query(User).filter(
        User.id == current_user.id
    ).first()

    if not verify_password(
        password_data.current_password,
        user.password
    ):
        return {
            "error": "Current password is incorrect"
        }

    user.password = hash_password(
        password_data.new_password
    )

    db.commit()

    return {
        "message": "Password Changed Successfully"
    }