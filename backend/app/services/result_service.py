from sqlalchemy.orm import Session

from app.models.result import Result
from app.models.student import Student
from app.models.course import Course
from app.schemas.result import ResultCreate


def calculate_grade(total):

    if total >= 85:
        return "A"
    elif total >= 80:
        return "A-"
    elif total >= 75:
        return "B+"
    elif total >= 70:
        return "B"
    elif total >= 65:
        return "B-"
    elif total >= 60:
        return "C+"
    elif total >= 55:
        return "C"
    elif total >= 50:
        return "D"

    return "F"


def calculate_gpa(grade: str):

    grade_points = {
        "A": 4.0,
        "A-": 3.7,
        "B+": 3.3,
        "B": 3.0,
        "B-": 2.7,
        "C+": 2.3,
        "C": 2.0,
        "D": 1.0,
        "F": 0.0
    }

    return grade_points.get(grade, 0.0)


def create_result(db: Session, result: ResultCreate):

    student = db.query(Student).filter(
        Student.id == result.student_id
    ).first()

    if not student:
        return {"error": "Student not found"}

    course = db.query(Course).filter(
        Course.id == result.course_id
    ).first()

    if not course:
        return {"error": "Course not found"}

    total = (
        result.assignment_marks +
        result.attendance_marks +
        result.mid_marks +
        result.final_marks
    )

    grade = calculate_grade(total)

    new_result = Result(
        student_id=result.student_id,
        course_id=result.course_id,
        assignment_marks=result.assignment_marks,
        attendance_marks=result.attendance_marks,
        mid_marks=result.mid_marks,
        final_marks=result.final_marks,
        total_marks=total,
        grade=grade
    )

    db.add(new_result)
    db.commit()
    db.refresh(new_result)

    return new_result


def get_results(db: Session):
    return db.query(Result).all()


def get_student_result(db: Session, student_id: int):
    return db.query(Result).filter(
        Result.student_id == student_id
    ).all()


def get_student_gpa(db: Session, student_id: int):

    results = db.query(Result).filter(
        Result.student_id == student_id
    ).all()

    if not results:
        return {
            "student_id": student_id,
            "gpa": 0
        }

    total_grade_points = 0
    total_credit_hours = 0

    for result in results:

        credit_hours = result.course.credit_hours
        grade_point = calculate_gpa(result.grade)

        total_grade_points += grade_point * credit_hours
        total_credit_hours += credit_hours

    gpa = round(
        total_grade_points / total_credit_hours,
        2
    )

    return {
        "student_id": student_id,
        "gpa": gpa
    }


def get_student_transcript(db: Session, student_id: int):

    student = db.query(Student).filter(
        Student.id == student_id
    ).first()

    if not student:
        return {"error": "Student not found"}

    results = db.query(Result).filter(
        Result.student_id == student_id
    ).all()

    transcript = []

    total_grade_points = 0
    total_credit_hours = 0

    for result in results:

        grade_point = calculate_gpa(result.grade)
        credit_hours = result.course.credit_hours

        total_grade_points += grade_point * credit_hours
        total_credit_hours += credit_hours

        transcript.append({
            "course": result.course.course_name,
            "course_code": result.course.course_code,
            "credit_hours": credit_hours,
            "marks": result.total_marks,
            "grade": result.grade,
            "grade_point": grade_point
        })

    gpa = round(
        total_grade_points / total_credit_hours,
        2
    ) if total_credit_hours else 0

    return {
        "student_id": student.id,
        "student_name": student.full_name,
        "gpa": gpa,
        "courses": transcript
    }
def get_student_cgpa(db: Session, student_id: int):

    results = db.query(Result).filter(
        Result.student_id == student_id
    ).all()

    if not results:
        return {
            "student_id": student_id,
            "cgpa": 0
        }

    total_grade_points = 0
    total_credit_hours = 0

    for result in results:

        grade_point = calculate_gpa(result.grade)
        credit_hours = result.course.credit_hours

        total_grade_points += grade_point * credit_hours
        total_credit_hours += credit_hours

    cgpa = round(
        total_grade_points / total_credit_hours,
        2
    )

    return {
        "student_id": student_id,
        "cgpa": cgpa,
        "completed_courses": len(results),
        "total_credit_hours": total_credit_hours
    }
def _resolve_student(db: Session, current_user):
    return db.query(Student).filter(
        Student.user_id == current_user.id
    ).first()


def get_my_result(db: Session, current_user):
    student = _resolve_student(db, current_user)
    if not student:
        return {"error": "Student profile not found"}
    return get_student_result(db, student.id)


def get_my_gpa(db: Session, current_user):
    student = _resolve_student(db, current_user)
    if not student:
        return {"error": "Student profile not found"}
    return get_student_gpa(db, student.id)


def get_my_transcript(db: Session, current_user):
    student = _resolve_student(db, current_user)
    if not student:
        return {"error": "Student profile not found"}
    return get_student_transcript(db, student.id)


def get_my_cgpa(db: Session, current_user):
    student = _resolve_student(db, current_user)
    if not student:
        return {"error": "Student profile not found"}
    return get_student_cgpa(db, student.id)


def get_course_results(db: Session, course_id: int):

    return db.query(Result).filter(
        Result.course_id == course_id
    ).all()


def update_result(
    db: Session,
    result_id: int,
    data: ResultCreate
):

    result = db.query(Result).filter(
        Result.id == result_id
    ).first()

    if not result:
        return {"error": "Result not found"}

    result.student_id = data.student_id
    result.course_id = data.course_id
    result.assignment_marks = data.assignment_marks
    result.attendance_marks = data.attendance_marks
    result.mid_marks = data.mid_marks
    result.final_marks = data.final_marks

    total = (
        data.assignment_marks +
        data.attendance_marks +
        data.mid_marks +
        data.final_marks
    )

    result.total_marks = total
    result.grade = calculate_grade(total)

    db.commit()
    db.refresh(result)

    return result


def delete_result(
    db: Session,
    result_id: int
):

    result = db.query(Result).filter(
        Result.id == result_id
    ).first()

    if not result:
        return {"error": "Result not found"}

    db.delete(result)
    db.commit()

    return {
        "message": "Result deleted successfully"
    }