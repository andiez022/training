import models
from common.auth import authentication, permit
from common.handle_object import handle_object, remove_fields
from common.pagination import with_pagination
from common.response import response
from flask import Blueprint, current_app, request
from functions.free_board import (admin_create_free_board_record,
                                  admin_delete_free_bulletin_board,
                                  create_free_board_record,
                                  delete_free_bulletin_board,
                                  update_free_bulletin_board,
                                  validate_free_board_author)
from validates import (AdminCreateFreeBoardSchema, AdminDeleteFreeBoardSchema,
                       CreateFreeBoardSchema, DeleteFreeBoardSchema, GetFreeBoardSchema,
                       EditFreeBoardSchema, ValidateAuthorFreeBoardSchema, GetFreeBoardDetailSchema,
                       validateWrapper)

free_board_bp = Blueprint('free_board', __name__,
                          url_prefix='/api/v1/free-board')


@free_board_bp.post("")
def create_free_board():
    data = handle_object(request.json)
    errors = validateWrapper(CreateFreeBoardSchema, data)
    if errors is not None:
        return errors

    return response(create_free_board_record(data))


@free_board_bp.post("/admin")
@authentication
@permit(["Admin"])
def admin_create_free_board():
    data = handle_object(request.json)
    errors = validateWrapper(AdminCreateFreeBoardSchema, data)
    if errors is not None:
        return errors

    return response(admin_create_free_board_record(data))


@free_board_bp.post("/<post_id>")
def validate_post_author(post_id):
    data = handle_object(request.json)
    errors = validateWrapper(ValidateAuthorFreeBoardSchema, data)
    if errors is not None:
        return errors
    existed_post = current_app.db.query(
        models.Free_Board).filter_by(id=post_id).first()
    existed_post = existed_post.to_dict()

    return response(validate_free_board_author(existed_post, data["password"]))


@free_board_bp.put("/admin/<post_id>")
@authentication
@permit(["Admin"])
def admin_edit_free_bulletin_board(post_id):
    data = handle_object(request.json)
    errors = validateWrapper(AdminCreateFreeBoardSchema, data)
    if errors is not None:
        return errors

    return response(update_free_bulletin_board(post_id, data))


@free_board_bp.put("/<post_id>")
def edit_free_bulletin_board(post_id):
    data = handle_object(request.json)
    errors = validateWrapper(EditFreeBoardSchema, data)
    if errors is not None:
        return errors

    return response(update_free_bulletin_board(post_id, data))


@free_board_bp.delete("/<post_id>")
def delete_post(post_id):
    data = handle_object(request.json)
    errors = validateWrapper(DeleteFreeBoardSchema, data)
    if errors is not None:
        return errors

    return response(delete_free_bulletin_board(post_id, data["password"]))


@free_board_bp.delete("")
@authentication
@permit(["Admin"])
def admin_delete_post():
    data = handle_object(request.json)
    errors = validateWrapper(AdminDeleteFreeBoardSchema, data)
    if errors is not None:
        return errors

    return response(admin_delete_free_bulletin_board(data["ids"]))


@free_board_bp.get("")
def get_paginated_list():
    params = request.args
    errors = validateWrapper(GetFreeBoardSchema, params)
    if errors is not None:
        return errors

    condition = []
    if "search_value" in params and params["search_value"] != "" and "search_by" in params:
        if params["search_by"] == "title":
            condition.append(models.Free_Board.title.ilike(
                "%{0}%".format(params["search_value"])))
        else:
            condition.append(models.Free_Board.author.ilike(
                "%{0}%".format(params["search_value"])))

    free_board_list = with_pagination(models.Free_Board, params, condition)

    free_board_list["list"] = list(
        map(lambda x: remove_fields(x, ["password"]), free_board_list["list"]))
    return response({"data": free_board_list})


@free_board_bp.get("/<post_id>")
def get_free_board_detail(post_id):
    params = request.args
    errors = validateWrapper(GetFreeBoardDetailSchema, params)

    if errors is not None:
        return errors
    existed_free_board = current_app.db.query(models.Free_Board).filter_by(
        id=post_id).first()

    if existed_free_board is None:
        return response({
            "message": "freeBoard.notFound",
            "code": 404,
            "success": False
        })

    existed_free_board = existed_free_board.to_dict()
    del existed_free_board["password"]

    condition = []
    if "search_value" in params and params["search_value"] != "" and "search_by" in params:
        if params["search_by"] == "title":
            condition.append(models.Free_Board.title.ilike(
                "%{0}%".format(params["search_value"])))
        else:
            condition.append(models.Free_Board.author.ilike(
                "%{0}%".format(params["search_value"])))

    previous = current_app.db.query(models.Free_Board).filter(
        models.Free_Board.created_at > existed_free_board['created_at'], *condition).order_by(models.Free_Board.created_at.asc()).first()
    next = current_app.db.query(models.Free_Board).filter(
        models.Free_Board.created_at < existed_free_board['created_at'], *condition).order_by(models.Free_Board.created_at.desc()).first()

    if previous is not None:
        previous = previous.to_dict()
        existed_free_board["previous"] = previous["id"]
    if next is not None:
        next = next.to_dict()
        existed_free_board["next"] = next["id"]
    return response({"data": existed_free_board})
