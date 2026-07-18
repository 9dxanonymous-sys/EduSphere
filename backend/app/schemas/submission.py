from datetime import datetime
from pydantic import BaseModel


class SubmissionCreate(BaseModel):
    assignment_id: int
    student_id: int
    submission_text: str


class SubmissionSubmit(BaseModel):
    assignment_id: int
    submission_text: str


class SubmissionResponse(BaseModel):
    id: int
    assignment_id: int
    student_id: int
    submission_text: str
    submitted_at: datetime
    marks: int
    feedback: str

    class Config:
        from_attributes = True