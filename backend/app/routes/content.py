import models
from common.auth import authentication, permit
from common.handle_object import handle_object
from common.pagination import with_pagination
from common.response import response
from flask import Blueprint, request, current_app
from functions.content import (create_content_record, delete_content_records,
                               update_content_record)
from validates import (CreateContentSchema, DeleteContentSchema,
                       EditContentSchema, GetContentSchema, validateWrapper)

content_bp = Blueprint('content', __name__, url_prefix='/api/v1/content')


@content_bp.post("")
@authentication
@permit(["Admin"])
def create_content():
    data = handle_object(request.json)
    errors = validateWrapper(CreateContentSchema, data)
    if errors is not None:
        return errors

    content = {"title": data["title"],
               "description": data["description"], "video": data["video"]}

    res = create_content_record(handle_object(content), request.user["id"])

    return response(res)


@content_bp.put('')
@authentication
@permit(["Admin"])
def edit_content():
    data = handle_object(request.json)
    errors = validateWrapper(EditContentSchema, data)
    if errors is not None:
        return errors

    update = {}

    if "video" in data:
        update["video"] = data["video"]
    if "title" in data:
        update["title"] = data["title"]
    if "description" in data:
        update["description"] = data["description"]

    res = update_content_record(handle_object(update), data["id"])
    return response(res)


@content_bp.delete('')
@authentication
@permit(["Admin"])
def delete_content():
    data = handle_object(request.json)

    errors = validateWrapper(DeleteContentSchema, data)
    if errors is not None:
        return errors

    res = delete_content_records(data["ids"])
    return response(res)


@content_bp.get("/<content_id>")
def get_content_detail(content_id):
    existed_content = current_app.db.query(models.Content).filter_by(
        id=content_id).first()

    if existed_content is None:
        return response({
            "message": "content.notFound",
            "code": 404,
            "success": False
        })

    result = existed_content.to_dict()

    return response({"data": result})


@content_bp.get('')
def get_content():
    params = request.args

    errors = validateWrapper(GetContentSchema, params)
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
        condition.append(models.Content.user_id == params["user_id"])

    if "search_value" in params and params["search_value"] != "" and "search_by" in params:
        if params["search_by"] == "title":
            condition.append(models.Content.title.ilike(
                "%{0}%".format(params["search_value"])))
        else:
            condition.append(models.Content.author.ilike(
                "%{0}%".format(params["search_value"])))

    content_list = with_pagination(models.Content, params, condition)

    return response({"data": content_list})
