from fastapi import APIRouter, Depends

from app.core.dependencies import admin_required

router = APIRouter(
    prefix="/admin",
    tags=["Admin"]
)


@router.get("/dashboard")
def dashboard(current_user=Depends(admin_required)):
    return {
        "message": "Welcome Admin",
        "user": current_user.username
    }