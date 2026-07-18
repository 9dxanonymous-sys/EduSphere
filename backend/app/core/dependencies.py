from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from sqlalchemy.orm import Session

from app.core.config import SECRET_KEY, ALGORITHM
from app.database.database import get_db
from app.models.user import User

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")


def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
):
    print("TOKEN RECEIVED:", token[:20], "...")

    credentials_exception = HTTPException(
        status_code=401,
        detail="Invalid Token"
    )

    try:
        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )
        print("DECODED PAYLOAD:", payload)

        user_id = payload.get("sub")

        if user_id is None:
            raise credentials_exception

    except JWTError as e:
        print("JWT ERROR:", str(e))
        raise credentials_exception

    user = db.query(User).filter(User.id == int(user_id)).first()

    if user is None:
        raise credentials_exception

    return user


def admin_required(current_user=Depends(get_current_user)):
    if current_user.role != "admin":
        raise HTTPException(
            status_code=403,
            detail="Admin access required"
        )
    return current_user


def teacher_required(current_user=Depends(get_current_user)):
    print("DEBUG role:", repr(current_user.role))
    if current_user.role != "teacher":
        raise HTTPException(
            status_code=403,
            detail="Teacher access required"
        )
    return current_user


def student_required(current_user=Depends(get_current_user)):
    if current_user.role != "student":
        raise HTTPException(
            status_code=403,
            detail="Student access required"
        )
    return current_user


def admin_or_teacher_required(current_user=Depends(get_current_user)):
    if current_user.role not in ("admin", "teacher"):
        raise HTTPException(
            status_code=403,
            detail="Admin or Teacher access required"
        )
    return current_user