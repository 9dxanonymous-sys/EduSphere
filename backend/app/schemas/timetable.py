from datetime import time
from pydantic import BaseModel


class TimetableCreate(BaseModel):
    course_id: int
    day_of_week: str
    start_time: time
    end_time: time
    room: str


class TimetableResponse(BaseModel):
    id: int
    course_id: int
    day_of_week: str
    start_time: time
    end_time: time
    room: str

    class Config:
        from_attributes = True
