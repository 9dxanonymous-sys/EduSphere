from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime

from app.database.database import Base


class Announcement(Base):

    __tablename__ = "announcements"


    id = Column(
        Integer,
        primary_key=True,
        index=True
    )


    title = Column(
        String,
        nullable=False
    )


    message = Column(
        Text,
        nullable=False
    )


    course_id = Column(
        Integer,
        ForeignKey("courses.id"),
        nullable=False
    )


    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )


    course = relationship("Course")