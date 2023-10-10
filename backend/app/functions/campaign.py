from sqlalchemy import delete
import models
from common.file import remove_file
from config.database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)


def create_campaign_record(campaign, user):
    with SessionLocal.begin() as session:
        try:
            new_campaign = models.Campaign(
                title=campaign["title"],
                content=campaign["content"],
                link=campaign["link"],
                image=campaign["image"],
                image_name=campaign["image_name"],
                user_id=user["id"],
                author=user["username"]
            )

            session.add(new_campaign)
            session.commit()
            return {"success": True}
        except Exception as e:
            session.rollback()
            return {"success": False, "code": 400, "message": str(e)}


def update_campaign_record(campaign, id):
    with SessionLocal.begin() as session:
        try:
            exist_campaign = session.query(models.Campaign).filter_by(
                id=id).first()

            if exist_campaign is None:
                return {"success": False, "code": 404, "message": "campaign.notFound"}

            if "content" in campaign:
                exist_campaign.content = campaign["content"]
            if "link" in campaign:
                exist_campaign.link = campaign["link"]
            if "title" in campaign:
                exist_campaign.title = campaign["title"]
            if "image" in campaign:
                exist_campaign.image = campaign["image"]
            if "image_name" in campaign:
                exist_campaign.image_name = campaign["image_name"]
            session.commit()
            return {"success": True}
        except Exception as e:
            session.rollback()
            return {"success": False, "code": 400, "message": str(e)}


def delete_campaign(ids):
    with SessionLocal.begin() as session:
        try:
            existed_campaigns = session.query(models.Campaign).filter(
                models.Campaign.id.in_(tuple(ids))).all()

            if (len(existed_campaigns) != len(ids)):
                return {"success": False, "message": "content.notFound", "code": 404}

            statement = delete(models.Campaign).where(
                models.Campaign.id.in_(tuple(ids)))
            session.execute(statement)
            for campaign in existed_campaigns:
                campaign = campaign.to_dict()
                remove_file(campaign["image"])
            session.commit()

            return {"success": True}
        except Exception as e:
            session.rollback()
            return {"success": False, "code": 400, "message": str(e)}
