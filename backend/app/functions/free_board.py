import models
from config.database import SessionLocal, engine
from flask import request, current_app
from sqlalchemy import delete

models.Base.metadata.create_all(bind=engine)


def create_free_board_record(data):
    with SessionLocal.begin() as session:
        try:
            new_free_board = models.Free_Board(
                title=data["title"],
                content=data["content"],
                author=data["author"].strip(),
                password=data["password"]
            )

            session.add(new_free_board)
            session.commit()
            return {"success": True}
        except Exception as e:
            session.rollback()
            return {"success": False, "code": 400, "message": str(e)}


def admin_create_free_board_record(data):
    with SessionLocal.begin() as session:
        try:
            new_free_board = models.Free_Board(
                title=data["title"],
                content=data["content"],
                author=request.user["username"],
                user_id=request.user["id"],
            )

            session.add(new_free_board)
            session.commit()
            return {"success": True}
        except Exception as e:
            session.rollback()
            return {"success": False, "code": 400, "message": str(e)}


def validate_free_board_author(existed_post, password):
    if existed_post is None:
        return {
            "success": False,
            "code": 404,
            "message": "freeBoard.notFound"
        }

    if existed_post["password"] is None:
        return {
            "success": False,
            "code": 403,
            "message": "freeBoard.permissionDenied"
        }

    if existed_post["password"] != password:
        return {
            "success": False,
            "code": 400,
            "message": "freeBoard.incorrectPassword"
        }

    return {"success": True}


def update_free_bulletin_board(post_id, data):
    with SessionLocal.begin() as session:
        try:
            exist_free_board = session.query(
                models.Free_Board).filter_by(id=post_id).first()

            if (hasattr(request, 'user') == False):
                result = validate_free_board_author(
                    exist_free_board.to_dict(), data["password"])
                if result["success"] != True:
                    return result

            exist_free_board.title = data["title"]
            exist_free_board.content = data["content"]

            session.commit()
            return {"success": True}
        except Exception as e:
            session.rollback()
            return {"success": False, "code": 400, "message": "error.anErrorOccurred"}


def delete_free_bulletin_board(id, password):
    with SessionLocal.begin() as session:
        try:
            exist_free_board = session.query(
                models.Free_Board).filter_by(id=id).first()
            exist_free_board = exist_free_board.to_dict()

            result = validate_free_board_author(
                exist_free_board, password)
            if result["success"] != True:
                return result

            statement = delete(models.Free_Board).where(
                models.Free_Board.id == exist_free_board["id"])
            session.execute(statement)
            session.commit()
            return {"success": True}
        except Exception as e:
            session.rollback()
            return {"success": False, "code": 400, "message": "error.anErrorOccurred"}


def admin_delete_free_bulletin_board(ids):
    with SessionLocal.begin() as session:
        try:
            existed_free_boards = session.query(models.Free_Board).filter(
                models.Free_Board.id.in_(tuple(ids))).all()

            if (len(existed_free_boards) != len(ids)):
                return {"success": False, "message": "freeBoard.notFound", "code": 404}

            statement = delete(models.Free_Board).where(
                models.Free_Board.id.in_(tuple(ids)))
            session.execute(statement)
            session.commit()

            return {"success": True}
        except Exception as e:
            session.rollback()
            return {"success": False, "code": 400, "message": str(e)}
