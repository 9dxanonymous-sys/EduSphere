from pydantic import BaseModel


class CourseCreate(BaseModel):
    course_code: str
    course_name: str
    credit_hours: int


class CourseResponse(BaseModel):
    id: int
    course_code: str
    course_name: str
    credit_hours: int

    class Config:
        from_attributes = True