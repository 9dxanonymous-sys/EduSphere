from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database.database import Base, engine
from app.database import base

from app.api.auth import router as auth_router
from app.api.users import router as user_router
from app.api.admin import router as admin_router
from app.api.course import router as course_router
from app.api.teachers import router as teacher_router
from app.api.students import router as student_router
from app.api.attendance import router as attendance_router
from app.api.assignments import router as assignment_router
from app.api.submissions import router as submission_router
from app.api.dashboard import router as dashboard_router
from app.api.upload import router as upload_router
from app.api.results import router as result_router
from app.api.timetable import router as timetable_router
from app.routers import reports
from app.api import announcement



Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="EduPortal API",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(user_router)
app.include_router(admin_router)
app.include_router(course_router)
app.include_router(teacher_router)
app.include_router(student_router)
app.include_router(attendance_router)
app.include_router(assignment_router)
app.include_router(submission_router)
app.include_router(dashboard_router)
app.include_router(upload_router)
app.include_router(announcement.router)
app.include_router(result_router)
app.include_router(timetable_router)
app.include_router(
reports.router,
    prefix="/reports",
    tags=["Reports"]
)
@app.get("/")
def home():
    return {"message": "Welcome to EduPortal 🚀"}