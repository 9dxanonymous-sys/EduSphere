from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship

from app.database.database import Base
from app.models.teacher_course import teacher_courses
from app.models.student_course import student_courses

class Course(Base):
    __tablename__ = "courses"

    id = Column(Integer, primary_key=True, index=True)
    course_code = Column(String, unique=True, nullable=False)
    course_name = Column(String, nullable=False)
    credit_hours = Column(Integer, nullable=False)

    teachers = relationship(
        "Teacher",
        secondary=teacher_courses,
        back_populates="courses"
    )
    students = relationship(
    "Student",
    secondary=student_courses,
    back_populates="courses"
)