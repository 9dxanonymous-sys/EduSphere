from app.database.database import SessionLocal
from app.database import base
from app.models.user import User
from app.core.security import hash_password

db = SessionLocal()

existing = db.query(User).filter(User.email == "admin@gmail.com").first()

if existing:
    print("Admin already exists:", existing.username, existing.role)
else:
    admin = User(
        username="admin",
        email="admin@gmail.com",
        password=hash_password("12345678"),
        role="admin",
        is_active=True,
    )
    db.add(admin)
    db.commit()
    db.refresh(admin)
    print("Admin created:", admin.id, admin.username, admin.role)

db.close()
