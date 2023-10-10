import models
from config.database import SessionLocal, engine
from sqlalchemy import delete
from flask import request

models.Base.metadata.create_all(bind=engine)


def create_content_record(content, user_id):
    with SessionLocal.begin() as session:
        try:
            new_content = models.Content(
                title=content["title"],
                video=content["video"],
                description=content["description"],
                user_id=user_id,
                author=request.user["username"]
            )

            session.add(new_content)
            session.commit()
            return {"success": True}
        except Exception as e:
            session.rollback()
            return {"success": False, "code": 400, "message": "error.anErrorOccurred"}


def update_content_record(content, id):
    with SessionLocal.begin() as session:
        try:
            exist_content = session.query(models.Content).filter_by(
                id=id).first()

            if exist_content is None or (exist_content.user_id != request.user["id"] and request.user["role"] == "Normal"):
                return {"success": False, "code": 404, "message": "content.notFound"}

            if "description" in content:
                exist_content.description = content["description"]

            if "video" in content:
                exist_content.video = content["video"]

            if "title" in content:
                exist_content.title = content["title"]
            session.commit()
            return {"success": True}
        except Exception as e:
            session.rollback()
            return {"success": False, "code": 400, "message": "error.anErrorOccurred"}


def delete_content_records(ids):
    with SessionLocal.begin() as session:
        try:
            condition = [models.Content.id.in_(tuple(ids))]
            if request.user["role"] == "Normal":
                condition.append(models.Content.user_id == request.user["id"])

            exist_contents = session.query(
                models.Content).filter(*condition).all()

            if (len(exist_contents) != len(ids)):
                return {"success": False, "code": 404, "message": "content.notFound"}

            statement = delete(models.Content).where(
                models.Content.id.in_(tuple(ids)))

            session.execute(statement)

            session.commit()
            return {"success": True}
        except Exception as e:
            session.rollback()
            return {"success": False, "code": 400, "message": "error.anErrorOccurred"}
