import models
from common.auth import authentication, permit
from common.handle_object import handle_object
from common.pagination import with_pagination
from common.response import response
from flask import Blueprint, current_app, request
from functions.notice import (create_notice_record, delete_notice_records,
                              update_notice_record)
from validates import (CreateNoticeSchema, DeleteNoticeSchema,
                       EditNoticeSchema, GetNoticeSchema, GetNoticeDetailSchema, validateWrapper)

notice_bp = Blueprint('notice', __name__, url_prefix='/api/v1/notice')


@notice_bp.post("")
@authentication
@permit(["Admin"])
def create_notice(*args, **kwargs):
    data = handle_object(request.json)
    errors = validateWrapper(CreateNoticeSchema, data)
    if errors is not None:
        return errors

    return response(create_notice_record(
        {"title": data["title"], "content": data["content"]}, request.user))


@notice_bp.route("", methods=["PUT", "DELETE"])
@authentication
def notice(*args, **kwargs):
    data = handle_object(request.json)
    if request.method == "PUT":

        errors = validateWrapper(EditNoticeSchema, data)
        if errors is not None:
            return errors

        return response(update_notice_record(data))

    if request.method == "DELETE":
        errors = validateWrapper(DeleteNoticeSchema, data)
        if errors is not None:
            return errors

        res = delete_notice_records(data["ids"])
        return response(res)

    return {"status": False, "code": 404, "message": "notFound"}


@notice_bp.get("/<notice_id>")
def get_notice_detail(notice_id):
    params = request.args
    errors = validateWrapper(GetNoticeDetailSchema, params)
    if errors is not None:
        return errors

    existed_notice = current_app.db.query(models.Notice).filter_by(
        id=notice_id).first()

    if existed_notice is None:
        return response({
            "message": "notice.notFound",
            "code": 404,
            "success": False
        })

    result = existed_notice.to_dict()

    condition = []
    if "search_value" in params and params["search_value"] != "" and "search_by" in params:
        if params["search_by"] == "title":
            condition.append(models.Notice.title.ilike(
                "%{0}%".format(params["search_value"])))
        else:
            condition.append(models.Notice.author.ilike(
                "%{0}%".format(params["search_value"])))

    previous = current_app.db.query(models.Notice).filter(
        models.Notice.created_at > result['created_at'], *condition).order_by(models.Notice.created_at.asc()).first()
    next = current_app.db.query(models.Notice).filter(
        models.Notice.created_at < result['created_at'], *condition).order_by(models.Notice.created_at.desc()).first()

    if previous is not None:
        previous = previous.to_dict()
        result["previous"] = previous["id"]
    if next is not None:
        next = next.to_dict()
        result["next"] = next["id"]

    return response({"data": result})


@notice_bp.get("")
def get_notice():
    params = request.args
    errors = validateWrapper(GetNoticeSchema, params)
    if errors is not None:
        return errors

    condition = []
    existed_user = None
    if "user_id" in params:
        existed_user = current_app.db.query(
            models.User).filter_by(id=params["user_id"]).first()
    if existed_user is not None:
        existed_user = existed_user.to_dict()
    if "user_id" in params and existed_user is not None and existed_user["role"] == "Normal":
        condition.append(models.Notice.user_id == params["user_id"])

    if "search_value" in params and params["search_value"] != "" and "search_by" in params:
        if params["search_by"] == "title":
            condition.append(models.Notice.title.ilike(
                "%{0}%".format(params["search_value"])))
        else:
            condition.append(models.Notice.author.ilike(
                "%{0}%".format(params["search_value"])))

    notice_list = with_pagination(models.Notice, params, condition)

    return response({"data": notice_list})
