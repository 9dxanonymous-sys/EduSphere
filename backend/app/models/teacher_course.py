from sqlalchemy import Table, Column, Integer, ForeignKey

from app.database.database import Base

teacher_courses = Table(
    "teacher_courses",
    Base.metadata,

    Column(
        "teacher_id",
        Integer,
        ForeignKey("teachers.id"),
        primary_key=True
    ),

    Column(
        "course_id",
        Integer,
        ForeignKey("courses.id"),
        primary_key=True
    )
)