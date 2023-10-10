import hashlib

import models
from common.auth import authentication, permit
from common.handle_object import handle_object, remove_fields
from common.pagination import with_pagination
from common.response import response
from common.token import generate_token
from config.database import SessionLocal
from flask import Blueprint, current_app, request
from functions.user import (create_user, delete_user_service,
                            elevate_user_service, update_user_data)
from sqlalchemy import or_
from sqlalchemy.orm import scoped_session
from validates import (GetUserListSchema, LoginSchema, RegisterSchema,
                       validateWrapper)

user_bp = Blueprint('user', __name__, url_prefix='/api/v1/user')
user_bp.db = scoped_session(SessionLocal)


@user_bp.post("/register")
def register():
    data = handle_object(request.json)
    error = validateWrapper(RegisterSchema, data)

    if error is not None:
        return error

    exist_user = current_app.db.query(models.User).filter(or_(models.User.username == data['username'], models.User.email == data["email"], models.User.phone_number == data["phone_number"])
                                                          ).first()
    if exist_user is not None:
        return response({"success": False, "message": "user.alreadyExist", "code": 409})

    return response(create_user(data))


@user_bp.put("/<user_id>")
@authentication
@permit(["Admin"])
def admin_update_user(user_id):
    data = handle_object(request.json)
    error = validateWrapper(RegisterSchema, data)

    if error is not None:
        return error

    existed_email = current_app.db.query(models.User).filter(
        models.User.username == data['username'], models.User.id != user_id).first()
    if existed_email is not None:
        return response({"success": False, "message": "user.idInUse", "code": 409})
    existed_email = current_app.db.query(models.User).filter(
        models.User.email == data['email'], models.User.id != user_id).first()
    if existed_email is not None:
        return response({"success": False, "message": "user.emailInUse", "code": 409})
    existed_email = current_app.db.query(models.User).filter(
        models.User.phone_number == data['phone_number'], models.User.id != user_id).first()
    if existed_email is not None:
        return response({"success": False, "message": "user.phoneInUse", "code": 409})

    return response(update_user_data(user_id, data))


@user_bp.post("/login")
def login():
    data = handle_object(request.json)

    error = validateWrapper(LoginSchema, data)
    if error is not None:
        return error

    exist_user = current_app.db.query(models.User).filter(
        models.User.username == data['username']).first()

    if exist_user is None:
        return response({"success": False, "code": 404, "message": "user.notFound"})

    exist_user = exist_user.to_dict()

    h_pass = hashlib.md5(data["password"].encode()).hexdigest()

    if h_pass != exist_user["password"]:
        return response({"success": False, "code": 400, "message": "user.passwordIncorrect"})

    exist_user["id"] = str(exist_user["id"])
    token = generate_token(exist_user)
    exist_user["token"] = token
    del exist_user["password"]
    return response({"success": True, "data": {"user": exist_user}, "code": 200})


@user_bp.put("/elevate/<user_id>")
@authentication
@permit(["Admin"])
def elevate_user(user_id):
    return response(elevate_user_service(user_id))


@user_bp.delete("/<user_id>")
@authentication
@permit(["Admin"])
def delete_user(user_id):
    if user_id == request.user["id"]:
        return response({"status": False, "message": "user.canNotDelete"})

    return response(delete_user_service(user_id))


@user_bp.get("/me")
@authentication
def get_current_user():
    user = request.user
    del user["password"]
    return response({"data": user})


@user_bp.get("/<user_id>")
@authentication
@permit(["Admin"])
def get_user_detail(user_id):
    existed_user = current_app.db.query(models.User).filter(
        models.User.id == user_id).first()
    existed_user = existed_user.to_dict()
    del existed_user["password"]
    return response({
        "data": existed_user
    })


@user_bp.get("")
@authentication
@permit(["Admin"])
def get_registered_users():
    params = request.args
    errors = validateWrapper(GetUserListSchema, params)
    if errors is not None:
        return errors

    condition = [models.User.role == "Normal"]

    if "search_value" in params and params["search_value"] != "" and "search_by" in params:
        if params["search_by"] == "name":
            condition.append(models.User.full_name.ilike(
                "%{0}%".format(params["search_value"])))
        else:
            condition.append(models.User.email.ilike(
                "%{0}%".format(params["search_value"])))

    result = with_pagination(
        models.User, params, condition)

    result["list"] = list(
        map(lambda x: remove_fields(x, ["password"]), result["list"]))

    return response({
        "data": result
    })
