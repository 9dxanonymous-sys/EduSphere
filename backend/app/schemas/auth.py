from fastapi import APIRouter

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


@router.get("/")
def test():
    return {
        "message": "Authentication API Working 🚀"
    }