from pydantic import BaseModel
from datetime import datetime



class AnnouncementCreate(BaseModel):

    title: str

    message: str

    course_id: int





class AnnouncementResponse(BaseModel):

    id: int

    title: str

    message: str

    course_id: int

    created_at: datetime


    class Config:

        from_attributes = True