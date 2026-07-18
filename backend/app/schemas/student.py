from pydantic import BaseModel, EmailStr


class StudentCreate(BaseModel):
    full_name: str
    email: EmailStr
    password: str
    semester: int
    department: str


class StudentUpdate(BaseModel):
    full_name: str
    email: EmailStr
    semester: int
    department: str


class ChangePassword(BaseModel):
    current_password: str
    new_password: str


class StudentResponse(BaseModel):
    id: int
    full_name: str
    email: EmailStr
    semester: int
    department: str

    class Config:
        from_attributes = True