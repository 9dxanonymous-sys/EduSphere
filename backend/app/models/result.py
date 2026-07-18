from sqlalchemy import Column,  String, Float, ForeignKey, Integer
from sqlalchemy.orm import relationship

from app.database.database import Base


class Result(Base):
    __tablename__ = "results"

    id = Column(Integer, primary_key=True, index=True)

    student_id = Column(
        Integer,
        ForeignKey("students.id"),
        nullable=False
    )

    course_id = Column(
        Integer,
        ForeignKey("courses.id"),
        nullable=False
    )

    assignment_marks = Column(Float, default=0)

    attendance_marks = Column(Float, default=0)

    mid_marks = Column(Float, default=0)

    final_marks = Column(Float, default=0)

    total_marks = Column(Float, default=0)

    grade = Column(String, default="F")

    student = relationship("Student")
    course = relationship("Course")