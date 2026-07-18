from pydantic import BaseModel


class ResultCreate(BaseModel):
    student_id: int
    course_id: int
    assignment_marks: float
    attendance_marks: float
    mid_marks: float
    final_marks: float


class ResultResponse(BaseModel):
    id: int
    student_id: int
    course_id: int
    assignment_marks: float
    attendance_marks: float
    mid_marks: float
    final_marks: float
    total_marks: float
    grade: str

    class Config:
        from_attributes = True