from pydantic import BaseModel
from typing import List


# ---------------- Summary ----------------

class ReportSummary(BaseModel):
    total_students: int
    total_teachers: int
    total_courses: int


# ---------------- Course Report ----------------

class CourseReport(BaseModel):
    id: int
    course_name: str
    teacher: str
    students_count: int

    class Config:
        from_attributes = True


class CourseDetail(BaseModel):
    id: int
    full_name: str
    department: str
    semester: int

    class Config:
        from_attributes = True


class CourseReportDetail(BaseModel):
    id: int
    course_name: str
    teacher: str
    students: List[CourseDetail]


# ---------------- Teacher Report ----------------

class TeacherReport(BaseModel):
    id: int
    teacher: str
    department: str
    courses_count: int
    students_count: int


class TeacherCourse(BaseModel):
    id: int
    course_name: str

    class Config:
        from_attributes = True


class TeacherReportDetail(BaseModel):
    id: int
    teacher: str
    department: str
    courses: List[TeacherCourse]


# ---------------- Student Report ----------------

class StudentReport(BaseModel):
    id: int
    student: str
    department: str
    semester: int
    courses_count: int


class StudentCourse(BaseModel):
    id: int
    course_name: str

    class Config:
        from_attributes = True


class StudentReportDetail(BaseModel):
    id: int
    student: str
    department: str
    semester: int
    courses: List[StudentCourse]