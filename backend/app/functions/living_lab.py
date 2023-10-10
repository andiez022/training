
import models
from config.database import SessionLocal, engine
from flask import request
from sqlalchemy import delete

models.Base.metadata.create_all(bind=engine)


def create_living_lab_record(living_lab, user):
    with SessionLocal.begin() as session:
        try:
            new_living_lab = models.Living_Lab(
                title=living_lab["title"],
                content=living_lab["content"],
                author=user["username"],
                user_id=user["id"]
            )

            session.add(new_living_lab)
            session.commit()
            return {"success": True}
        except Exception as e:
            session.rollback()
            return {"success": False, "code": 400, "message": str(e)}


def update_living_lab_record(living_lab, id):
    with SessionLocal.begin() as session:
        try:
            exist_living_lab = session.query(models.Living_Lab).filter_by(
                id=id).first()

            if exist_living_lab is None or (exist_living_lab.user_id != request.user["id"] and request.user["role"] == "Normal"):
                return {"success": False, "code": 404, "message": "livingLab.notFound"}

            if request.user["role"] != "Admin" and exist_living_lab.user_id != request.user["id"]:
                return {"success": False, "code": 403, "message": "livingLab.isNotOwner"}

            if "content" in living_lab:
                exist_living_lab.content = living_lab["content"]

            if "title" in living_lab:
                exist_living_lab.title = living_lab["title"]

            session.commit()
            return {"success": True}
        except Exception as e:
            session.rollback()
            return {"success": False, "code": 400, "message": str(e)}


def delete_living_lab_records(ids):
    with SessionLocal.begin() as session:
        try:
            condition = [models.Living_Lab.id.in_(tuple(ids))]
            if request.user["role"] == "Normal":
                condition.append(models.Living_Lab.user_id ==
                                 request.user["id"])
            exist_living_labs = session.query(
                models.Living_Lab).filter(*condition).all()

            if (len(exist_living_labs) != len(ids)):
                return {"success": False, "code": 404, "message": "livingLab.notFound"}

            for living_lab in exist_living_labs:
                living_lab = living_lab.to_dict()
                if request.user["role"] != "Admin" and living_lab["user_id"] != request.user["id"]:
                    raise Exception("livingLab.isNotOwner")

            statement = delete(models.Living_Lab).where(
                models.Living_Lab.id.in_(tuple(ids)))

            session.execute(statement)
            session.commit()

            return {"success": True}
        except Exception as e:
            session.rollback()
            return {"success": False, "code": 400, "message": str(e)}
