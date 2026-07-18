from sqlalchemy.orm import Session

from app.models.student import Student
from app.models.teacher import Teacher
from app.models.course import Course
from app.models.assignment import Assignment
from app.models.submission import Submission
from app.models.attendance import Attendance


def admin_dashboard(db: Session):

    return {
        "total_students": db.query(Student).count(),
        "total_teachers": db.query(Teacher).count(),
        "total_courses": db.query(Course).count(),
        "total_assignments": db.query(Assignment).count(),
        "total_submissions": db.query(Submission).count(),
        "total_attendance_records": db.query(Attendance).count()
    }
from app.models.teacher import Teacher


def teacher_dashboard(db: Session):

    total_courses = db.query(Course).count()

    total_assignments = db.query(Assignment).count()

    total_students = db.query(Student).count()

    total_submissions = db.query(Submission).count()

    return {
        "total_courses": total_courses,
        "total_assignments": total_assignments,
        "total_students": total_students,
        "total_submissions": total_submissions
    }
def student_dashboard(db: Session):

    enrolled_courses = db.query(Student).count()

    submitted_assignments = db.query(Submission).count()

    attendance_records = db.query(Attendance).count()

    assignments = db.query(Assignment).count()

    return {
        "enrolled_courses": enrolled_courses,
        "submitted_assignments": submitted_assignments,
        "attendance_records": attendance_records,
        "total_assignments": assignments
    }