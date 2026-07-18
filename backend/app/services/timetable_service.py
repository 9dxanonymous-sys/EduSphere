from sqlalchemy.orm import Session

from app.models.timetable import Timetable
from app.models.course import Course
from app.models.teacher import Teacher
from app.models.student import Student
from app.schemas.timetable import TimetableCreate


def _serialize(entry: Timetable):

    course = entry.course

    teacher_names = [t.full_name for t in course.teachers] if course else []

    return {
        "id": entry.id,
        "course_id": entry.course_id,
        "course_code": course.course_code if course else None,
        "course_name": course.course_name if course else None,
        "teachers": teacher_names,
        "day_of_week": entry.day_of_week,
        "start_time": entry.start_time,
        "end_time": entry.end_time,
        "room": entry.room,
    }


def create_timetable_entry(db: Session, data: TimetableCreate):

    course = db.query(Course).filter(
        Course.id == data.course_id
    ).first()

    if not course:
        return {"error": "Course not found"}

    entry = Timetable(
        course_id=data.course_id,
        day_of_week=data.day_of_week,
        start_time=data.start_time,
        end_time=data.end_time,
        room=data.room,
    )

    db.add(entry)
    db.commit()
    db.refresh(entry)

    return _serialize(entry)


def get_all_timetable(db: Session):

    entries = db.query(Timetable).all()

    return [_serialize(e) for e in entries]


def get_course_timetable(db: Session, course_id: int):

    entries = db.query(Timetable).filter(
        Timetable.course_id == course_id
    ).all()

    return [_serialize(e) for e in entries]


def get_teacher_timetable(db: Session, current_user):

    teacher = db.query(Teacher).filter(
        Teacher.user_id == current_user.id
    ).first()

    if not teacher:
        return {"error": "Teacher profile not found"}

    course_ids = [course.id for course in teacher.courses]

    if not course_ids:
        return []

    entries = db.query(Timetable).filter(
        Timetable.course_id.in_(course_ids)
    ).all()

    return [_serialize(e) for e in entries]


def get_student_timetable(db: Session, current_user):

    student = db.query(Student).filter(
        Student.user_id == current_user.id
    ).first()

    if not student:
        return {"error": "Student profile not found"}

    course_ids = [course.id for course in student.courses]

    if not course_ids:
        return []

    entries = db.query(Timetable).filter(
        Timetable.course_id.in_(course_ids)
    ).all()

    return [_serialize(e) for e in entries]


def update_timetable_entry(db: Session, entry_id: int, data: TimetableCreate):

    entry = db.query(Timetable).filter(
        Timetable.id == entry_id
    ).first()

    if not entry:
        return {"error": "Timetable entry not found"}

    course = db.query(Course).filter(
        Course.id == data.course_id
    ).first()

    if not course:
        return {"error": "Course not found"}

    entry.course_id = data.course_id
    entry.day_of_week = data.day_of_week
    entry.start_time = data.start_time
    entry.end_time = data.end_time
    entry.room = data.room

    db.commit()
    db.refresh(entry)

    return _serialize(entry)


def delete_timetable_entry(db: Session, entry_id: int):

    entry = db.query(Timetable).filter(
        Timetable.id == entry_id
    ).first()

    if not entry:
        return {"error": "Timetable entry not found"}

    db.delete(entry)
    db.commit()

    return {"message": "Timetable entry deleted successfully"}
