from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime

from app.database.database import Base


class Submission(Base):
    __tablename__ = "submissions"

    id = Column(Integer, primary_key=True, index=True)

    assignment_id = Column(
        Integer,
        ForeignKey("assignments.id"),
        nullable=False
    )

    student_id = Column(
        Integer,
        ForeignKey("students.id"),
        nullable=False
    )

    submission_text = Column(String, nullable=False)

    submitted_at = Column(
        DateTime,
        default=datetime.utcnow
    )

    marks = Column(Integer, default=0)

    feedback = Column(String, default="")

    assignment = relationship("Assignment")
    student = relationship("Student")