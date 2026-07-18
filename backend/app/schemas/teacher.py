from pydantic import BaseModel, EmailStr


class TeacherCreate(BaseModel):
    full_name: str
    email: EmailStr
    password: str
    department: str


class TeacherUpdate(BaseModel):
    full_name: str
    email: EmailStr
    department: str


class TeacherProfileUpdate(BaseModel):
    full_name: str
    email: EmailStr
    department: str


class ChangePassword(BaseModel):
    current_password: str
    new_password: str


class TeacherResponse(BaseModel):
    id: int
    full_name: str
    email: EmailStr
    department: str

    class Config:
        from_attributes = True