from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from fastapi.responses import StreamingResponse
from app.services.pdf_service import generate_transcript_pdf

from app.database.database import get_db
from app.schemas.result import ResultCreate
from app.services.result_service import (
    create_result,
    get_results,
    get_student_result,
    get_student_gpa,
    get_student_transcript,
    get_student_cgpa,
    get_course_results,
    update_result,
    delete_result,
    get_my_result,
    get_my_gpa,
    get_my_transcript,
    get_my_cgpa,
)
from app.core.dependencies import teacher_required, student_required

router = APIRouter(
    prefix="/results",
    tags=["Results"]
)


@router.post("/")
def add_result(
    result: ResultCreate,
    db: Session = Depends(get_db),
    current_user=Depends(teacher_required)
):
    return create_result(db, result)


@router.get("/")
def all_results(
    db: Session = Depends(get_db),
    current_user=Depends(teacher_required)
):
    return get_results(db)


@router.get("/student/my")
def my_result(
    db: Session = Depends(get_db),
    current_user=Depends(student_required)
):
    return get_my_result(db, current_user)


@router.get("/student/my/gpa")
def my_gpa(
    db: Session = Depends(get_db),
    current_user=Depends(student_required)
):
    return get_my_gpa(db, current_user)


@router.get("/student/my/transcript")
def my_transcript(
    db: Session = Depends(get_db),
    current_user=Depends(student_required)
):
    return get_my_transcript(db, current_user)


@router.get("/student/my/cgpa")
def my_cgpa(
    db: Session = Depends(get_db),
    current_user=Depends(student_required)
):
    return get_my_cgpa(db, current_user)


@router.get("/student/my/transcript/pdf")
def download_my_transcript_pdf(
    db: Session = Depends(get_db),
    current_user=Depends(student_required)
):

    transcript = get_my_transcript(db, current_user)

    if "error" in transcript:
        return transcript

    pdf = generate_transcript_pdf(transcript)

    return StreamingResponse(
        pdf,
        media_type="application/pdf",
        headers={
            "Content-Disposition":
            f'attachment; filename="Transcript_{transcript["student_id"]}.pdf"'
        }
    )


@router.get("/student/{student_id:int}")
def student_result(
    student_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(teacher_required)
):
    return get_student_result(db, student_id)
@router.get("/student/{student_id:int}/gpa")
def student_gpa(
    student_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(teacher_required)
):
    return get_student_gpa(db, student_id)
@router.get("/student/{student_id:int}/transcript")
def transcript(
    student_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(teacher_required)
):
    return get_student_transcript(db, student_id)
@router.get("/student/{student_id:int}/cgpa")
def student_cgpa(
    student_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(teacher_required)
):
    return get_student_cgpa(db, student_id)
@router.get("/student/{student_id:int}/transcript/pdf")
def download_transcript_pdf(
    student_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(teacher_required)
):

    transcript = get_student_transcript(
        db,
        student_id
    )

    if "error" in transcript:
        return transcript

    pdf = generate_transcript_pdf(transcript)

    return StreamingResponse(
        pdf,
        media_type="application/pdf",
        headers={
            "Content-Disposition":
            f'attachment; filename="Transcript_{student_id}.pdf"'
        }
    )
@router.get("/course/{course_id:int}")
def course_results(
    course_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(teacher_required)
):
    return get_course_results(
        db,
        course_id
    )


@router.put("/{result_id}")
def edit_result(
    result_id: int,
    result: ResultCreate,
    db: Session = Depends(get_db),
    current_user=Depends(teacher_required)
):
    return update_result(
        db,
        result_id,
        result
    )


@router.delete("/{result_id}")
def remove_result(
    result_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(teacher_required)
):
    return delete_result(
        db,
        result_id
    )