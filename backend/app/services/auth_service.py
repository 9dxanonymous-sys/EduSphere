from sqlalchemy.orm import Session

from app.models.user import User
from app.schemas.user import UserRegister
from app.core.security import hash_password, verify_password
from app.core.jwt_handler import create_access_token


def create_user(db: Session, user: UserRegister):
    hashed_password = hash_password(user.password)

    new_user = User(
        username=user.username,
        email=user.email,
        password=hashed_password,
        role=user.role,
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user


def login_user(db, email, password):

    print("LOGIN ATTEMPT — email:", repr(email), "| password:", repr(password))

    user = db.query(User).filter(User.email == email).first()

    if not user:
        print("LOGIN FAILED — no user found with this email")
        return {"error": "Invalid Email"}

    print("USER FOUND — id:", user.id, "role:", user.role, "stored_hash:", user.password)

    if not verify_password(password, user.password):
        print("LOGIN FAILED — password did not match the stored hash")
        return {"error": "Invalid Password"}

    print("LOGIN SUCCESS")

    token = create_access_token(
        {
            "sub": str(user.id),
            "role": user.role
        }
    )

    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "role": user.role
        }
    }