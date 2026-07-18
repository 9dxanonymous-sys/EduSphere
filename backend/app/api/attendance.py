from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.schemas.attendance import AttendanceBulkCreate
from app.services.attendance_service import (
    mark_attendance,
    get_student_attendance,
    get_my_attendance,
)
from app.core.dependencies import teacher_required, student_required

router = APIRouter(
    prefix="/attendance",
    tags=["Attendance"]
)


@router.post("/mark")
def create_attendance(
    attendance: AttendanceBulkCreate,
    db: Session = Depends(get_db),
    current_user=Depends(teacher_required)
):
    return mark_attendance(db, attendance)


@router.get("/student/my")
def my_attendance(
    db: Session = Depends(get_db),
    current_user=Depends(student_required)
):
    return get_my_attendance(db, current_user)


@router.get("/student/{student_id:int}")
def student_attendance(
    student_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(teacher_required)
):
    return get_student_attendance(db, student_id)