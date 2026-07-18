from datetime import date
from pydantic import BaseModel


class AttendanceItem(BaseModel):
    student_id: int
    status: str  # "Present" ya "Absent"


class AttendanceBulkCreate(BaseModel):
    course_id: int
    attendance: list[AttendanceItem]


class AttendanceResponse(BaseModel):
    id: int
    student_id: int
    course_id: int
    attendance_date: date
    present: bool

    class Config:
        from_attributes = True