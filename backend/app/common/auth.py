from functools import wraps

import jwt
import models
from common.response import response
from config.env import env
from flask import abort, current_app, request


def authentication(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        if "Authorization" in request.headers and request.headers["Authorization"] and "Bearer " in request.headers["Authorization"]:
            token = request.headers["Authorization"].split(" ")[1]
        if not token:
            return response({"success": False, "code": 401, "message": "Unauthorized"})
        try:
            data = jwt.decode(
                token, env["JWT_SECRET_KEY"], algorithms=["HS256"])
            current_user = current_app.db.query(models.User).filter_by(
                id=data["id"]).first()
            if current_user is None:
                return response({"success": False, "code": 401, "message": "Unauthorized"})
        except Exception as e:
            return response({"success": False, "code": 401, "message": "Token Invalid"})
        request.user = current_user.to_dict()
        return f(*args, **kwargs)

    return decorated


def permit(roles):
    def decorator(function):
        def wrapper(*args, **kwargs):
            user = request.user

            if not user or user['role'] not in roles:
                return {
                    "message": "Permission denied!",
                    "data": None,
                    "error": "user.permissionDenied"
                }, 403
            return function(*args, **kwargs)
        wrapper.__name__ = function.__name__
        return wrapper
    return decorator
