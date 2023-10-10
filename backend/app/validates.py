from marshmallow import Schema, fields, validates, ValidationError, validate
from marshmallow.validate import Length
from common.file import remove_file
from common.response import response
import re


class RegisterSchema(Schema):
    username = fields.Str(required=True, validate=Length(min=4, max=100))
    email = fields.Email(required=True, validate=Length(max=50))
    password = fields.Str(required=True, validate=Length(min=4, max=50))
    full_name = fields.Str(required=True, validate=Length(min=1, max=100))
    phone_number = fields.Str(required=True, validate=Length(min=3, max=14))

    @validates('username')
    def validate_whitespace_username(self, value):
        if any(char.isspace() for char in value):
            raise ValidationError(
                "Username cannot be empty or contain only whitespace.")

    @validates('password')
    def validate_whitespace_password(self, value):
        if any(char.isspace() for char in value):
            raise ValidationError(
                "Password cannot be empty or contain only whitespace.")

    @validates('phone_number')
    def validate_phone_number(self, value):
        # Regular expression pattern for phone number validation
        pattern = r'^\d{3,14}$'
        if not re.match(pattern, value):
            raise ValidationError('Invalid phone number.')


class LoginSchema(Schema):
    username = fields.Str(required=True, validate=Length(min=4, max=100))
    password = fields.Str(required=True, validate=Length(min=1, max=50))

    @validates('username')
    def validate_whitespace_username(self, value):
        if any(char.isspace() for char in value):
            raise ValidationError(
                "Username cannot be empty or contain only whitespace.")

    @validates('password')
    def validate_whitespace_password(self, value):
        if any(char.isspace() for char in value):
            raise ValidationError(
                "Password cannot be empty or contain only whitespace.")


class CreateNoticeSchema(Schema):
    title = fields.Str(required=True, validate=Length(min=1, max=200))
    content = fields.Str(required=True, validate=Length(min=1))


class CreateFreeBoardSchema(Schema):
    author = fields.Str()
    password = fields.Str()
    title = fields.Str(required=True, validate=Length(min=1, max=200))
    content = fields.Str(required=True, validate=Length(min=1))


class EditFreeBoardSchema(Schema):
    password = fields.Str(required=True)
    title = fields.Str(required=True, validate=Length(min=1, max=200))
    content = fields.Str(required=True, validate=Length(min=1))


class DeleteFreeBoardSchema(Schema):
    password = fields.Str(required=True)


class AdminDeleteFreeBoardSchema(Schema):
    ids = fields.List(fields.UUID(), required=True)


class ValidateAuthorFreeBoardSchema(Schema):
    password = fields.Str(required=True, validate=Length(min=1))


class AdminCreateFreeBoardSchema(Schema):
    title = fields.Str(required=True, validate=Length(min=1, max=200))
    content = fields.Str(required=True, validate=Length(min=1))


class GetFreeBoardSchema(Schema):
    page = fields.Integer(validate=validate.Range(min=0))
    page_size = fields.Integer(validate=validate.Range(min=1))
    search_by = fields.Str(validate=validate.OneOf(["title", "author"]))
    search_value = fields.Str()


class EditNoticeSchema(Schema):
    id = fields.UUID(required=True)
    title = fields.Str(validate=Length(min=1, max=200))
    content = fields.Str(validate=Length(min=1))


class DeleteNoticeSchema(Schema):
    ids = fields.List(fields.String(), required=True)


class GetNoticeSchema(Schema):
    page = fields.Integer(validate=validate.Range(min=0))
    page_size = fields.Integer(validate=validate.Range(min=1))
    search_by = fields.Str(validate=validate.OneOf(["title", "author"]))
    search_value = fields.Str()
    user_id = fields.UUID()


class GetNoticeDetailSchema(Schema):
    search_by = fields.Str(validate=validate.OneOf(["title", "author"]))
    search_value = fields.Str()


class GetFreeBoardDetailSchema(Schema):
    search_by = fields.Str(validate=validate.OneOf(["title", "author"]))
    search_value = fields.Str()


class GetLivingLabDetailSchema(Schema):
    search_by = fields.Str(validate=validate.OneOf(["title", "author"]))
    search_value = fields.Str()


class GetUserListSchema(Schema):
    page = fields.Integer(validate=validate.Range(min=0))
    page_size = fields.Integer(validate=validate.Range(min=1))
    search_value = fields.Str()
    search_by = fields.Str(validate=validate.OneOf(["email", "name"]))
    sort_by = fields.Str(validate=validate.OneOf(["created_at"]))
    sort_direction = fields.Str(validate=validate.OneOf(["DESC", "ASC"]))


class CreateContentSchema(Schema):
    title = fields.Str(required=True, validate=Length(min=1, max=200))
    video = fields.Str(require=True, required=True)
    description = fields.Str(required=True, validate=Length(min=1))


class EditContentSchema(Schema):
    id = fields.UUID(required=True)
    title = fields.Str(validate=Length(min=1, max=200))
    video = fields.Str()
    description = fields.Str(validate=Length(min=1))


class DeleteContentSchema(Schema):
    ids = fields.List(fields.String(), required=True)


class GetContentSchema(Schema):
    page = fields.Integer(validate=validate.Range(min=0))
    page_size = fields.Integer(validate=validate.Range(min=1))
    search_by = fields.Str(validate=validate.OneOf(["title", "author"]))
    search_value = fields.Str()
    user_id = fields.UUID()


class CreateLivingLabSchema(Schema):
    title = fields.Str(required=True, validate=Length(min=1, max=200))
    content = fields.Str(validate=Length(min=1))


class EditLivingLabSchema(Schema):
    id = fields.UUID(required=True)
    title = fields.Str(validate=Length(min=1, max=200))
    content = fields.Str(validate=Length(min=1))


class DeleteLivingLabSchema(Schema):
    ids = fields.List(fields.String(), required=True)


class GetLivingLabSchema(Schema):
    page = fields.Integer(validate=validate.Range(min=0))
    page_size = fields.Integer(validate=validate.Range(min=1))
    search_by = fields.Str(validate=validate.OneOf(["title", "author"]))
    search_value = fields.Str()
    user_id = fields.UUID()


class CreateCampaignSchema(Schema):
    title = fields.Str(required=True, validate=Length(min=1, max=200))
    content = fields.Str(required=True, validate=Length(min=1))
    link = fields.Str(required=True, validate=Length(min=1))
    image = fields.Str(required=True)
    image_name = fields.Str(required=True)


class EditCampaignSchema(Schema):
    id = fields.UUID(required=True)
    title = fields.Str(validate=Length(min=1, max=200))
    content = fields.Str(validate=Length(min=1))
    link = fields.Str(validate=Length(min=1))
    image = fields.Str()
    image_name = fields.Str(required=True)


class DeleteCampaignSchema(Schema):
    ids = fields.List(fields.String(), required=True)


class GetCampaignSchema(Schema):
    page = fields.Integer(validate=validate.Range(min=0))
    page_size = fields.Integer(validate=validate.Range(min=1))
    search_by = fields.Str(validate=validate.OneOf(["title", "author"]))
    search_value = fields.Str()


def validateWrapper(schema, obj):
    create = schema()
    errors = create.validate(obj)
    if errors:
        if "filename" in obj:
            remove_file(obj["filename"])
        return response({"success": False, "code": 400, "message": errors})
    return None
