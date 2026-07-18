from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.services.dashboard_service import admin_dashboard
from app.core.dependencies import admin_required
from app.services.dashboard_service import (
    admin_dashboard,
    teacher_dashboard
)
router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)


@router.get("/admin")
def dashboard(
    db: Session = Depends(get_db),
    current_user=Depends(admin_required)
):
    return admin_dashboard(db)
@router.get("/teacher")
def teacher_dashboard_api(
    db: Session = Depends(get_db),
    current_user=Depends(admin_required)
):
    return teacher_dashboard(db)
from app.services.dashboard_service import (
    admin_dashboard,
    teacher_dashboard,
    student_dashboard
)
@router.get("/student")
def student_dashboard_api(
    db: Session = Depends(get_db),
    current_user=Depends(admin_required)
):
    return student_dashboard(db)