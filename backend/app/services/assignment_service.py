from sqlalchemy.orm import Session

from app.models.assignment import Assignment
from app.models.course import Course
from app.models.student import Student
from app.schemas.assignment import AssignmentCreate


def create_assignment(db: Session, assignment: AssignmentCreate):

    course = db.query(Course).filter(
        Course.id == assignment.course_id
    ).first()

    if not course:
        return {"error": "Course not found"}

    new_assignment = Assignment(
        title=assignment.title,
        description=assignment.description,
        due_date=assignment.due_date,
        course_id=assignment.course_id
    )

    db.add(new_assignment)
    db.commit()
    db.refresh(new_assignment)

    return new_assignment


def get_assignments(db: Session):
    return db.query(Assignment).all()


def get_course_assignments(db: Session, course_id: int):

    return db.query(Assignment).filter(
        Assignment.course_id == course_id
    ).all()


def get_my_course_assignments(db: Session, current_user, course_id: int):

    student = db.query(Student).filter(
        Student.user_id == current_user.id
    ).first()

    if not student:
        return {"error": "Student profile not found"}

    course = db.query(Course).filter(
        Course.id == course_id
    ).first()

    if not course or course not in student.courses:
        return {"error": "You are not enrolled in this course"}

    return get_course_assignments(db, course_id)


def update_assignment(
    db: Session,
    assignment_id: int,
    assignment_data: AssignmentCreate
):

    assignment = db.query(Assignment).filter(
        Assignment.id == assignment_id
    ).first()

    if not assignment:
        return {"error": "Assignment not found"}

    assignment.title = assignment_data.title
    assignment.description = assignment_data.description
    assignment.due_date = assignment_data.due_date
    assignment.course_id = assignment_data.course_id

    db.commit()
    db.refresh(assignment)

    return assignment


def delete_assignment(
    db: Session,
    assignment_id: int
):

    assignment = db.query(Assignment).filter(
        Assignment.id == assignment_id
    ).first()

    if not assignment:
        return {"error": "Assignment not found"}

    db.delete(assignment)
    db.commit()

    return {
        "message": "Assignment deleted successfully"
    }