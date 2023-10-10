"""Define functions to use in redis queue."""

import hashlib
from config.database import SessionLocal
import models
from config.database import engine

models.Base.metadata.create_all(bind=engine)


def create_user(user):
    with SessionLocal.begin() as session:
        try:
            newUser = models.User(
                username=user["username"],
                email=user["email"],
                password=hashlib.md5(user["password"].encode()).hexdigest(),
                full_name=user["full_name"],
                phone_number=user["phone_number"]
            )

            session.add(newUser)
            session.commit()
            return {"success": True}
        except Exception as e:
            session.rollback()
            return {
                "success": False,
                "message": str(e),
                "code": 400,
            }


def elevate_user_service(user_id):
    with SessionLocal.begin() as session:
        try:
            existed_user = session.query(models.User).filter_by(
                id=user_id).first()

            if existed_user is None:
                return {
                    "success": False,
                    "message": "user.notFound",
                    "code": 404,
                }

            existed_user.role = "Admin"
            session.commit()

            return {"success": True}
        except Exception as e:
            session.rollback()
            return {
                "success": False,
                "message": str(e),
                "code": 400,
            }


def update_user_data(user_id, data):
    with SessionLocal.begin() as session:
        try:
            existed_user = session.query(models.User).filter_by(
                id=user_id).first()

            if existed_user is None:
                return {
                    "success": False,
                    "message": "user.notFound",
                    "code": 404,
                }
            if existed_user.role == "Admin":
                return {
                    "success": False,
                    "message": "user.permissionDenied",
                    "code": 403,
                }

            existed_user.username = data["username"]
            existed_user.full_name = data["full_name"]
            existed_user.password = hashlib.md5(
                data["password"].encode()).hexdigest()
            existed_user.email = data["email"]
            existed_user.phone_number = data["phone_number"]
            session.commit()

            return {"success": True}
        except Exception as e:
            session.rollback()
            return {
                "success": False,
                "message": str(e),
                "code": 400,
            }


def delete_user_service(user_id):
    with SessionLocal.begin() as session:
        try:
            existed_user = session.query(models.User).filter_by(
                id=user_id).first()

            if existed_user is None:
                return {
                    "success": False,
                    "message": "user.notFound",
                    "code": 404,
                }

            if existed_user.role == "Admin":
                return {"success": False, "code": 400, "message": "user.canNotDeleteOtherAdmin"}

            session.delete(existed_user)
            session.commit()

            return {"success": True}
        except Exception as e:
            session.rollback()
            return {
                "success": False,
                "message": str(e),
                "code": 400,
            }
