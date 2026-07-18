from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

from app.database.database import Base
from app.models.student_course import student_courses


class Student(Base):
    __tablename__ = "students"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        unique=True
    )

    full_name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    semester = Column(Integer, nullable=False)
    department = Column(String, nullable=False)

    user = relationship(
        "User",
        back_populates="student"
    )

    courses = relationship(
        "Course",
        secondary=student_courses,
        back_populates="students"
    )