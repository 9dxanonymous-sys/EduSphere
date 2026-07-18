from sqlalchemy.orm import Session

from app.models.submission import Submission
from app.models.assignment import Assignment
from app.models.student import Student
from app.schemas.submission import SubmissionCreate


def create_submission(db: Session, submission: SubmissionCreate):

    assignment = db.query(Assignment).filter(
        Assignment.id == submission.assignment_id
    ).first()

    if not assignment:
        return {"error": "Assignment not found"}

    student = db.query(Student).filter(
        Student.id == submission.student_id
    ).first()

    if not student:
        return {"error": "Student not found"}

    new_submission = Submission(
        assignment_id=submission.assignment_id,
        student_id=submission.student_id,
        submission_text=submission.submission_text
    )

    db.add(new_submission)
    db.commit()
    db.refresh(new_submission)

    return new_submission


def get_student_submissions(db: Session, student_id: int):
    return db.query(Submission).filter(
        Submission.student_id == student_id
    ).all()


def submit_as_student(db: Session, current_user, assignment_id: int, submission_text: str):

    student = db.query(Student).filter(
        Student.user_id == current_user.id
    ).first()

    if not student:
        return {"error": "Student profile not found"}

    assignment = db.query(Assignment).filter(
        Assignment.id == assignment_id
    ).first()

    if not assignment:
        return {"error": "Assignment not found"}

    existing = db.query(Submission).filter(
        Submission.assignment_id == assignment_id,
        Submission.student_id == student.id
    ).first()

    if existing:
        return {"error": "You have already submitted this assignment"}

    new_submission = Submission(
        assignment_id=assignment_id,
        student_id=student.id,
        submission_text=submission_text
    )

    db.add(new_submission)
    db.commit()
    db.refresh(new_submission)

    return new_submission


def get_my_submissions(db: Session, current_user):

    student = db.query(Student).filter(
        Student.user_id == current_user.id
    ).first()

    if not student:
        return {"error": "Student profile not found"}

    return get_student_submissions(db, student.id)
def grade_submission(db: Session, submission_id: int, marks: int, feedback: str):

    submission = db.query(Submission).filter(
        Submission.id == submission_id
    ).first()

    if not submission:
        return {"error": "Submission not found"}

    submission.marks = marks
    submission.feedback = feedback

    db.commit()
    db.refresh(submission)

    return submission