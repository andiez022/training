"""SQLAlchemy database models."""
import datetime
import hashlib
import uuid

from config.database import Base
from seed import users
from sqlalchemy import UUID, Column, Enum, ForeignKey, String, Text, event
from sqlalchemy.orm import relationship
from sqlalchemy.types import DateTime


class DictMixIn:
    """Provides a to_dict method to a SQLAlchemy database model."""

    def to_dict(self):
        """Returns a JSON serializable dictionary from a SQLAlchemy database model."""
        return {
            column.name: getattr(self, column.name)
            if not isinstance(
                getattr(self, column.name), (datetime.datetime, datetime.date)
            )
            else getattr(self, column.name).isoformat()
            for column in self.__table__.columns
        }


class TimestampMixIn(object):
    created_at = Column(DateTime, default=datetime.datetime.now)
    updated_at = Column(DateTime, default=datetime.datetime.now,
                        onupdate=datetime.datetime.now)


class User(Base, TimestampMixIn, DictMixIn):

    __tablename__ = "user"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    full_name = Column(String(100), nullable=False)
    username = Column(String(100), nullable=False)
    phone_number = Column(String(20), nullable=False)
    email = Column(String(80), unique=True, nullable=False)
    password = Column(String, nullable=False)
    role = Column(Enum("Admin", "Normal",
                  name="role"), default="Normal")
    notices = relationship(
        'Notice', back_populates='user_notice', cascade='all, delete')
    contents = relationship(
        'Content', back_populates='user_content', cascade='all, delete')
    living_labs = relationship(
        'Living_Lab', back_populates='user_living', cascade='all, delete')


class Notice(Base, TimestampMixIn, DictMixIn):

    __tablename__ = "notice"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    title = Column(String, nullable=False)
    author = Column(String, nullable=False)
    content = Column(Text, nullable=False)
    user_id = Column(UUID(as_uuid=True), ForeignKey('user.id'))

    user_notice = relationship('User', back_populates='notices')


class Content(Base, TimestampMixIn, DictMixIn):

    __tablename__ = "content"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    title = Column(String, nullable=False)
    video = Column(String, nullable=False)
    description = Column(Text, nullable=False)
    user_id = Column(UUID(as_uuid=True), ForeignKey('user.id'))
    author = Column(String, nullable=False)
    user_content = relationship('User', back_populates='contents')


class Living_Lab(Base, TimestampMixIn, DictMixIn):

    __tablename__ = "living_lab"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    title = Column(String, nullable=False)
    content = Column(Text, nullable=False)
    author = Column(String, nullable=False)
    user_id = Column(UUID(as_uuid=True), ForeignKey('user.id'))

    user_living = relationship('User', back_populates='living_labs')


class Campaign(Base, TimestampMixIn, DictMixIn):
    __tablename__ = "campaign"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    title = Column(String, nullable=False)
    author = Column(String, nullable=False)
    content = Column(Text, nullable=False)
    image = Column(String, nullable=False)
    image_name = Column(String, nullable=False)
    link = Column(String)
    user_id = Column(UUID(as_uuid=True), ForeignKey('user.id'))


class Free_Board(Base, TimestampMixIn, DictMixIn):
    __tablename__ = "free_board"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    author = Column(String, nullable=False)
    password = Column(String(50))
    title = Column(String, nullable=False)
    content = Column(Text, nullable=False)
    user_id = Column(UUID(as_uuid=True), ForeignKey('user.id'))


# class Campaign(Base, TimestampMixIn, DictMixIn):
#     __tablename__ = "campaign"

#     id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
#     title = Column(String, nullable=False)
#     author = Column(String, nullable=False)
#     content = Column(Text, nullable=False)
#     image = Column(String, nullable=False)
#     user_id = Column(UUID(as_uuid=True), ForeignKey('user.id'))


# class Free_Board(Base, TimestampMixIn, DictMixIn):
#     __tablename__ = "free_board"


@event.listens_for(User.__table__, "after_create")
def seed(target, connection, **kw):
    try:
        for user in users:
            connection.execute(target.insert(), {"username": user["username"], "full_name": user["full_name"], "email": user["email"], "role": user["role"],
                                                 "password": hashlib.md5(user["password"].encode()).hexdigest(), "phone_number": user["phone_number"]})
    except Exception as e:
        raise e


# @event.listens_for(Notice.__table__, "after_create")
# def seed(target, connection, **kw):
#     try:
#         for notice in notices:
#             connection.execute(target.insert(), {"title": notice["title"], "author": notice["author"],
#                                                  "content": notice["content"]})
#     except Exception as e:
#         raise e
