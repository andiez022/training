import models
from config.database import SessionLocal, engine
from sqlalchemy import delete
from flask import request

models.Base.metadata.create_all(bind=engine)


def create_notice_record(notice, user):
    with SessionLocal.begin() as session:
        try:
            new_notice = models.Notice(
                title=notice["title"],
                content=notice["content"],
                user_id=user["id"],
                author=user["username"]
            )

            session.add(new_notice)
            session.commit()
            return {"success": True}
        except Exception as e:
            session.rollback()
            return {"success": False, "code": 400, "message": str(e)}


def update_notice_record(notice):
    with SessionLocal.begin() as session:
        try:
            exist_notice = session.query(models.Notice).filter_by(
                id=notice["id"]).first()

            if exist_notice is None or (exist_notice.user_id != request.user["id"] and request.user["role"] == "Normal"):
                return {"success": False, "message": "notice.notFound", "code": 404}

            if "content" in notice:
                exist_notice.content = str(notice["content"])

            if "title" in notice:
                exist_notice.title = str(notice["title"])

            session.commit()
            return {"success": True}
        except Exception as e:
            session.rollback()
            return {"success": False, "code": 400, "message": "error.anErrorOccurred"}


def delete_notice_records(ids):
    with SessionLocal.begin() as session:
        try:
            condition = [models.Notice.id.in_(tuple(ids))]
            if request.user["role"] == "Normal":
                condition.append(models.Notice.user_id == request.user["id"])

            exist_notices = session.query(
                models.Notice).filter(*condition).all()

            if (len(exist_notices) != len(ids)):
                return {"success": False, "code": 404, "message": "notice.notFound"}

            statement = delete(models.Notice).where(
                models.Notice.id.in_(tuple(ids)))

            session.execute(statement)

            session.commit()
            return {"success": True}
        except Exception as e:
            session.rollback()
            return {"success": False, "code": 400, "message": "error.anErrorOccurred"}
