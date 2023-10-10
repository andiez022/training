import models
from common.auth import authentication
from common.handle_object import handle_object
from common.pagination import with_pagination
from common.response import response
from flask import Blueprint, current_app, request
from functions.living_lab import (create_living_lab_record,
                                  delete_living_lab_records,
                                  update_living_lab_record)
from validates import (CreateLivingLabSchema, DeleteLivingLabSchema,
                       EditLivingLabSchema, GetLivingLabDetailSchema,
                       GetLivingLabSchema, validateWrapper)

living_lab_bp = Blueprint('living-lab', __name__,
                          url_prefix='/api/v1/living-lab')


@living_lab_bp.post("")
@authentication
def create_living_lab():
    data = handle_object(request.json)
    errors = validateWrapper(CreateLivingLabSchema, data)
    if errors is not None:
        return errors

    res = create_living_lab_record(
        {"title": data["title"], "content": data["content"]}, request.user)

    return response(res)


@living_lab_bp.put("")
@authentication
def update_living_lab():
    data = handle_object(request.json)

    errors = validateWrapper(EditLivingLabSchema, data)
    if errors is not None:
        return errors

    update = {}

    if "title" in data:
        update["title"] = data["title"]
    if "content" in data:
        update["content"] = data["content"]

    res = update_living_lab_record(handle_object(update), data["id"])

    return response(res)


@living_lab_bp.delete('')
@authentication
def delete_content():
    data = handle_object(request.json)

    errors = validateWrapper(DeleteLivingLabSchema, data)
    if errors is not None:
        return errors

    res = delete_living_lab_records(data["ids"])
    return response(res)


@living_lab_bp.get("/<living_lab_id>")
def get_living_lab_detail(living_lab_id):
    params = request.args
    errors = validateWrapper(GetLivingLabDetailSchema, params)
    if errors is not None:
        return errors

    existed_living_lab = current_app.db.query(models.Living_Lab).filter_by(
        id=living_lab_id).first()

    if existed_living_lab is None:
        return response({
            "message": "living_lab.notFound",
            "code": 404,
            "success": False
        })

    result = existed_living_lab.to_dict()

    condition = []
    if "search_value" in params and params["search_value"] != "" and "search_by" in params:
        if params["search_by"] == "title":
            condition.append(models.Living_Lab.title.ilike(
                "%{0}%".format(params["search_value"])))
        else:
            condition.append(models.Living_Lab.author.ilike(
                "%{0}%".format(params["search_value"])))

    previous = current_app.db.query(models.Living_Lab).filter(
        models.Living_Lab.created_at > result['created_at'], *condition).order_by(models.Living_Lab.created_at.asc()).first()
    next = current_app.db.query(models.Living_Lab).filter(
        models.Living_Lab.created_at < result['created_at'], *condition).order_by(models.Living_Lab.created_at.desc()).first()

    if previous is not None:
        previous = previous.to_dict()
        result["previous"] = previous["id"]
    if next is not None:
        next = next.to_dict()
        result["next"] = next["id"]

    return response({"data": result})


@living_lab_bp.get('')
def get_content():
    params = request.args

    errors = validateWrapper(GetLivingLabSchema, params)
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
        condition.append(models.Living_Lab.user_id == params["user_id"])

    if "search_value" in params and params["search_value"] != "" and "search_by" in params:
        if params["search_by"] == "title":
            condition.append(models.Living_Lab.title.like(
                "%{0}%".format(params["search_value"])))
        else:
            condition.append(models.Living_Lab.author.like(
                "%{0}%".format(params["search_value"])))

    living_lab_list = with_pagination(models.Living_Lab, params, condition)

    return response({"data": living_lab_list})
