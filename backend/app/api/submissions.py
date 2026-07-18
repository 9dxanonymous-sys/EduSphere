from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.schemas.submission import SubmissionSubmit
from app.services.submission_service import (
    get_student_submissions,
    submit_as_student,
    get_my_submissions,
    grade_submission,
)
from app.core.dependencies import teacher_required, student_required

router = APIRouter(
    prefix="/submissions",
    tags=["Submissions"]
)


@router.post("/")
def submit_assignment(
    submission: SubmissionSubmit,
    db: Session = Depends(get_db),
    current_user=Depends(student_required)
):
    return submit_as_student(
        db,
        current_user,
        submission.assignment_id,
        submission.submission_text
    )


@router.get("/student/my")
def my_submissions(
    db: Session = Depends(get_db),
    current_user=Depends(student_required)
):
    return get_my_submissions(db, current_user)


@router.get("/student/{student_id:int}")
def student_submissions(
    student_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(teacher_required)
):
    return get_student_submissions(db, student_id)


@router.put("/{submission_id:int}/grade")
def grade(
    submission_id: int,
    marks: int,
    feedback: str,
    db: Session = Depends(get_db),
    current_user=Depends(teacher_required)
):
    return grade_submission(
        db,
        submission_id,
        marks,
        feedback
    )
