from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.schemas.assignment import AssignmentCreate
from app.services.assignment_service import (
    create_assignment,
    get_assignments,
    get_course_assignments,
    get_my_course_assignments,
    update_assignment,
    delete_assignment,
)

from app.core.dependencies import teacher_required, student_required

router = APIRouter(
    prefix="/assignments",
    tags=["Assignments"]
)


@router.post("/")
def add_assignment(
    assignment: AssignmentCreate,
    db: Session = Depends(get_db),
    current_user=Depends(teacher_required)
):
    return create_assignment(db, assignment)


@router.get("/")
def all_assignments(
    db: Session = Depends(get_db),
    current_user=Depends(teacher_required)
):
    return get_assignments(db)


@router.get("/course/{course_id:int}/my")
def my_course_assignments(
    course_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(student_required)
):
    return get_my_course_assignments(db, current_user, course_id)


@router.get("/course/{course_id:int}")
def course_assignments(
    course_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(teacher_required)
):
    return get_course_assignments(db, course_id)


@router.put("/{assignment_id:int}")
def edit_assignment(
    assignment_id: int,
    assignment: AssignmentCreate,
    db: Session = Depends(get_db),
    current_user=Depends(teacher_required)
):
    return update_assignment(
        db,
        assignment_id,
        assignment
    )


@router.delete("/{assignment_id:int}")
def remove_assignment(
    assignment_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(teacher_required)
):
    return delete_assignment(
        db,
        assignment_id
    )
