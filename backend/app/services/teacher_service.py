from sqlalchemy.orm import Session

from app.models.teacher import Teacher
from app.models.course import Course
from app.models.user import User

from app.schemas.teacher import TeacherCreate

from app.core.security import hash_password
from app.schemas.teacher import (
    TeacherCreate,
    TeacherProfileUpdate,
    ChangePassword,
)

from app.core.security import (
    hash_password,
    verify_password,
)


def create_teacher(db: Session, teacher: TeacherCreate):

    # Check existing email
    existing_user = db.query(User).filter(
        User.email == teacher.email
    ).first()

    if existing_user:
        return {
            "error": "Email already exists"
        }


    # Create login account
    new_user = User(
        username=teacher.email,
        email=teacher.email,
        password=hash_password(teacher.password),
        role="teacher"
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)



    # Create teacher profile
    new_teacher = Teacher(
        user_id=new_user.id,
        full_name=teacher.full_name,
        email=teacher.email,
        department=teacher.department
    )

    db.add(new_teacher)
    db.commit()
    db.refresh(new_teacher)


    return new_teacher




def get_teachers(db: Session):

    return db.query(Teacher).all()




def update_teacher(
    db: Session,
    teacher_id: int,
    teacher_data: TeacherCreate
):

    teacher = db.query(Teacher).filter(
        Teacher.id == teacher_id
    ).first()


    if not teacher:
        return {
            "error": "Teacher not found"
        }


    teacher.full_name = teacher_data.full_name
    teacher.email = teacher_data.email
    teacher.department = teacher_data.department


    db.commit()
    db.refresh(teacher)


    return teacher




def delete_teacher(
    db: Session,
    teacher_id: int
):

    teacher = db.query(Teacher).filter(
        Teacher.id == teacher_id
    ).first()


    if not teacher:
        return {
            "error": "Teacher not found"
        }


    # Delete teacher profile
    user_id = teacher.user_id

    db.delete(teacher)
    db.commit()


    # Delete login account
    if user_id:

        user = db.query(User).filter(
            User.id == user_id
        ).first()

        if user:
            db.delete(user)
            db.commit()



    return {
        "message": "Teacher deleted successfully"
    }




def assign_course(
    db: Session,
    teacher_id: int,
    course_id: int
):

    teacher = db.query(Teacher).filter(
        Teacher.id == teacher_id
    ).first()


    course = db.query(Course).filter(
        Course.id == course_id
    ).first()



    if not teacher:
        return {
            "error": "Teacher not found"
        }


    if not course:
        return {
            "error": "Course not found"
        }



    if course in teacher.courses:
        return {
            "message": "Course already assigned"
        }



    teacher.courses.append(course)

    db.commit()
    db.refresh(teacher)


    return {
        "message": "Course assigned successfully"
    }




def get_teacher_courses(
    db: Session,
    teacher_id: int
):

    teacher = db.query(Teacher).filter(
        Teacher.id == teacher_id
    ).first()


    if not teacher:
        return {
            "error": "Teacher not found"
        }


    return {
        "teacher": teacher.full_name,
        "courses": teacher.courses
    }


def update_teacher_profile(
    db: Session,
    current_user,
    teacher_data: TeacherProfileUpdate
):

    teacher = db.query(Teacher).filter(
        Teacher.user_id == current_user.id
    ).first()

    if not teacher:
        return {
            "error": "Teacher profile not found"
        }

    teacher.full_name = teacher_data.full_name
    teacher.email = teacher_data.email
    teacher.department = teacher_data.department

    teacher.user.email = teacher_data.email
    teacher.user.username = teacher_data.email

    db.commit()
    db.refresh(teacher)

    return {
        "message": "Profile Updated Successfully"
    }


def change_teacher_password(
    db: Session,
    current_user,
    password_data: ChangePassword
):

    user = db.query(User).filter(
        User.id == current_user.id
    ).first()

    if not verify_password(
        password_data.current_password,
        user.password
    ):

        return {
            "error": "Current password is incorrect"
        }

    user.password = hash_password(
        password_data.new_password
    )

    db.commit()

    return {
        "message": "Password Changed Successfully"
    }