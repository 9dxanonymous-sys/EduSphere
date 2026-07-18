from datetime import date
from pydantic import BaseModel


class AssignmentCreate(BaseModel):
    title: str
    description: str
    due_date: date
    course_id: int


class AssignmentResponse(BaseModel):
    id: int
    title: str
    description: str
    due_date: date
    course_id: int

    class Config:
        from_attributes = True