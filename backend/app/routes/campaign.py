import models
from common.auth import authentication, permit
from common.file import parse_file
from common.handle_object import handle_object
from common.pagination import with_pagination
from common.response import response
from flask import Blueprint, current_app, request
from functions.campaign import (create_campaign_record, delete_campaign,
                                update_campaign_record)
from validates import (CreateCampaignSchema, DeleteCampaignSchema,
                       EditCampaignSchema, GetCampaignSchema, validateWrapper)

campaign_bp = Blueprint('campaign', __name__, url_prefix='/api/v1/campaign')


@campaign_bp.post("")
@authentication
@permit(["Admin"])
def create_living_lab():
    data = handle_object(request.json)
    errors = validateWrapper(CreateCampaignSchema, data)
    if errors is not None:
        return errors
    new = {"title": data["title"],
           "content": data["content"], "link": data["link"], "image": data["image"], "image_name": data["image_name"]}

    res = create_campaign_record(new, request.user)

    return response(res)


@campaign_bp.put('')
@authentication
@permit(["Admin"])
def edit_content():
    data = handle_object(request.json)
    errors = validateWrapper(EditCampaignSchema, data)
    if errors is not None:
        return errors

    update = {}
    if "title" in data:
        update["title"] = data["title"]
    if "content" in data:
        update["content"] = data["content"]
    if "link" in data:
        update["link"] = data["link"]
    if "image" in data:
        update["image"] = data["image"]
    if "image_name" in data:
        update["image_name"] = data["image_name"]

    res = update_campaign_record(handle_object(update), data["id"])
    return response(res)


@campaign_bp.delete('')
@authentication
@permit(["Admin"])
def delete_content():
    data = handle_object(request.json)

    errors = validateWrapper(DeleteCampaignSchema, data)
    if errors is not None:
        return errors

    res = delete_campaign(data["ids"])
    return response(res)


@campaign_bp.get('/<campaign_id>')
def get_campaign_detail(campaign_id):
    existed_campaign = current_app.db.query(models.Campaign).filter_by(
        id=campaign_id).first()

    if existed_campaign is None:
        return response({
            "message": "campaign.notFound",
            "code": 404,
            "success": False
        })

    existed_campaign = existed_campaign.to_dict()
    parse_file(existed_campaign, "image")
    return response({"data": existed_campaign})


@campaign_bp.get('')
def get_content():
    params = request.args

    errors = validateWrapper(GetCampaignSchema, params)
    if errors is not None:
        return errors

    condition = []
    if "search_value" in params and params["search_value"] != "" and "search_by" in params:
        if params["search_by"] == "title":
            condition.append(models.Campaign.title.ilike(
                "%{0}%".format(params["search_value"])))
        else:
            condition.append(models.Campaign.author.ilike(
                "%{0}%".format(params["search_value"])))

    campaign_list = with_pagination(models.Campaign, params, condition)
    campaign_list["list"] = list(
        map(lambda x: parse_file(x, "image"), campaign_list["list"]))
    return response({"data": campaign_list})
