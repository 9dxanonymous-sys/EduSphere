from sqlalchemy.orm import Session

from app.models.course import Course
from app.schemas.course import CourseCreate


def create_course(db: Session, course: CourseCreate):
    new_course = Course(
        course_code=course.course_code,
        course_name=course.course_name,
        credit_hours=course.credit_hours
    )

    db.add(new_course)
    db.commit()
    db.refresh(new_course)

    return new_course


def get_courses(db: Session):
    return db.query(Course).all()


def update_course(db: Session, course_id: int, course_data: CourseCreate):
    course = db.query(Course).filter(Course.id == course_id).first()

    if not course:
        return {"error": "Course not found"}

    course.course_code = course_data.course_code
    course.course_name = course_data.course_name
    course.credit_hours = course_data.credit_hours

    db.commit()
    db.refresh(course)

    return course


def delete_course(db: Session, course_id: int):
    course = db.query(Course).filter(Course.id == course_id).first()

    if not course:
        return {"error": "Course not found"}

    db.delete(course)
    db.commit()

    return {"message": "Course deleted successfully"}
def get_teacher_courses(db: Session, teacher_id: int):
    teacher = db.query(Teacher).filter(
        Teacher.id == teacher_id
    ).first()

    if not teacher:
        return {"error": "Teacher not found"}

    return {
        "teacher": teacher.full_name,
        "courses": teacher.courses
    }