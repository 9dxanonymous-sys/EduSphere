from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

from app.database.database import Base
from app.models.teacher_course import teacher_courses


class Teacher(Base):
    __tablename__ = "teachers"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        unique=True
    )

    full_name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    department = Column(String, nullable=False)

    user = relationship(
        "User",
        back_populates="teacher"
    )

    courses = relationship(
        "Course",
        secondary=teacher_courses,
        back_populates="teachers"
    )