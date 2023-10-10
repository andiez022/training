from flask import current_app
from sqlalchemy import asc, desc


def pagination(model, params):
    default = {
        "page": 0,
        "size": 30,
        "search_value": None,
        "search_by": None,
        "get_latest": None
    }

    if "page" in params:
        default["page"] = int(params["page"])

    if "size" in params:
        default["size"] = int(params["size"])

    if "search_by" in params and "search_value" in params:
        default["search_by"] = str(params["search_by"])
        default["search_value"] = str(params["search_value"])
        records = current_app.db.query(model).order_by(
            model.updated_at.desc()).filter(getattr(model, default["search_by"]).contains(f'{default["search_value"]}')).offset(default["page"] * default["size"]).limit(default["size"])
        return {"list": list(map(lambda x: x.to_dict(), records)), "page": default["page"], "size": default["size"], "search_by": default["search_by"], "search_value": default["search_value"]}

    records = current_app.db.query(model).order_by(
        model.updated_at.desc()).offset(default["page"] * default["size"]).limit(default["size"])
    return {"list": list(map(lambda x: x.to_dict(), records)), "page": default["page"], "size": default["size"]}


def with_pagination(model, params, filter=[]):
    pagination_params = {
        "page": 0,
        "page_size": 20,
        "sort_by": "created_at",
        "sort_direction": "DESC",
    }

    if "page" in params:
        pagination_params["page"] = int(params["page"])
    if "page_size" in params:
        pagination_params["page_size"] = int(params["page_size"])
    if "sort_by" in params:
        pagination_params["sort_by"] = params["sort_by"]
    if "sort_direction" in params:
        pagination_params["sort_direction"] = params["sort_direction"].upper()

    order = asc(pagination_params["sort_by"]) if pagination_params["sort_direction"] == "ASC" else desc(
        pagination_params["sort_by"])

    items = current_app.db.query(model).filter(*filter).order_by(order).limit(pagination_params["page_size"]).offset(
        pagination_params["page"] * pagination_params["page_size"]).all()

    total = current_app.db.query(model).filter(*filter).count()

    return {
        "list": list(map(lambda x: x.to_dict(), items)),
        "total": total,
        "has_more": pagination_params["page"]*pagination_params["page_size"] + len(items) < total
    }
