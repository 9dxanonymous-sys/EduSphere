from datetime import date

from sqlalchemy.orm import Session

from app.models.attendance import Attendance
from app.models.student import Student
from app.schemas.attendance import AttendanceBulkCreate


def mark_attendance(db: Session, data: AttendanceBulkCreate):

    today = date.today()

    for item in data.attendance:

        present = item.status == "Present"

        existing = db.query(Attendance).filter(
            Attendance.student_id == item.student_id,
            Attendance.course_id == data.course_id,
            Attendance.attendance_date == today
        ).first()

        if existing:
            existing.present = present
        else:
            new_attendance = Attendance(
                student_id=item.student_id,
                course_id=data.course_id,
                attendance_date=today,
                present=present
            )
            db.add(new_attendance)

    db.commit()

    return {
        "message": "Attendance marked successfully"
    }


def get_student_attendance(db: Session, student_id: int):
    return db.query(Attendance).filter(
        Attendance.student_id == student_id
    ).all()


def get_my_attendance(db: Session, current_user):

    student = db.query(Student).filter(
        Student.user_id == current_user.id
    ).first()

    if not student:
        return {"error": "Student profile not found"}

    return get_student_attendance(db, student.id)