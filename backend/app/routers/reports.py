from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db

from app.models.student import Student
from app.models.teacher import Teacher
from app.models.course import Course
from fastapi import HTTPException

from app.schemas.report import *
router = APIRouter()


@router.get(
    "/summary",
    response_model=ReportSummary
)
def get_summary(db: Session = Depends(get_db)):

    total_students = db.query(Student).count()
    total_teachers = db.query(Teacher).count()
    total_courses = db.query(Course).count()

    return ReportSummary(
        total_students=total_students,
        total_teachers=total_teachers,
        total_courses=total_courses
    )


@router.get(
    "/courses",
    response_model=list[CourseReport]
)
def course_reports(db: Session = Depends(get_db)):

    courses = db.query(Course).all()

    data = []

    for course in courses:

        teacher_name = "Not Assigned"

        if course.teachers:
            teacher_name = course.teachers[0].full_name

        data.append(
            CourseReport(
                id=course.id,
                course_name=course.course_name,
                teacher=teacher_name,
                students_count=len(course.students)
            )
        )

    return data
@router.get(
    "/courses/{course_id}",
    response_model=CourseReportDetail
)
def course_detail(course_id: int, db: Session = Depends(get_db)):

    course = db.query(Course).filter(Course.id == course_id).first()

    if not course:
        raise HTTPException(status_code=404, detail="Course not found")

    teacher_name = "Not Assigned"

    if course.teachers:
        teacher_name = course.teachers[0].full_name

    students = [
        CourseDetail(
            id=student.id,
            full_name=student.full_name,
            department=student.department,
            semester=student.semester
        )
        for student in course.students
    ]

    return CourseReportDetail(
        id=course.id,
        course_name=course.course_name,
        teacher=teacher_name,
        students=students
    )
@router.get(
    "/teachers",
    response_model=list[TeacherReport]
)
def teacher_reports(db: Session = Depends(get_db)):

    teachers = db.query(Teacher).all()

    data = []

    for teacher in teachers:

        students = set()

        for course in teacher.courses:
            for student in course.students:
                students.add(student.id)

        data.append(
            TeacherReport(
                id=teacher.id,
                teacher=teacher.full_name,
                department=teacher.department,
                courses_count=len(teacher.courses),
                students_count=len(students)
            )
        )

    return data
@router.get(
    "/teachers/{teacher_id}",
    response_model=TeacherReportDetail
)
def teacher_detail(teacher_id: int, db: Session = Depends(get_db)):

    teacher = db.query(Teacher).filter(
        Teacher.id == teacher_id
    ).first()

    if not teacher:
        raise HTTPException(status_code=404, detail="Teacher not found")

    return TeacherReportDetail(
        id=teacher.id,
        teacher=teacher.full_name,
        department=teacher.department,
        courses=[
            TeacherCourse(
                id=course.id,
                course_name=course.course_name
            )
            for course in teacher.courses
        ]
    )
@router.get(
    "/students",
    response_model=list[StudentReport]
)
def student_reports(db: Session = Depends(get_db)):

    students = db.query(Student).all()

    data = []

    for student in students:
        data.append(
            StudentReport(
                id=student.id,
                student=student.full_name,
                department=student.department,
                semester=student.semester,
                courses_count=len(student.courses)
            )
        )

    return data
@router.get(
    "/students/{student_id}",
    response_model=StudentReportDetail
)
def student_detail(student_id: int, db: Session = Depends(get_db)):

    student = db.query(Student).filter(
        Student.id == student_id
    ).first()

    if not student:
        raise HTTPException(
            status_code=404,
            detail="Student not found"
        )

    return StudentReportDetail(
        id=student.id,
        student=student.full_name,
        department=student.department,
        semester=student.semester,
        courses=[
            StudentCourse(
                id=course.id,
                course_name=course.course_name
            )
            for course in student.courses
        ]
    )