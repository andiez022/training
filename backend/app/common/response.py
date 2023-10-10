def response(data={}):
    response = {"message": "Success", "code": 200,
                "data": None, "success": True}

    if "message" in data:
        response["message"] = data["message"]
    if "code" in data:
        response["code"] = data["code"]
    if "data" in data:
        response["data"] = data["data"]
    if "success" in data:
        response["success"] = data["success"]

    return response, response["code"]
