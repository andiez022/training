import os
import uuid

from config.env import env
from flask import request, send_from_directory
from werkzeug.datastructures import MultiDict
from werkzeug.utils import secure_filename
from common.response import response

VIDEO_EXTENSION = {
    'mp4',
    'avi',
    'mkv',
    'mov',
    'wmv',
    'flv',
    'webm',
    'mpg',
    'mpeg',
    'm4v',
}
IMAGE_EXTENSION = {
    'jpeg',
    'jpg',
    'png',
    'gif',
    'bmp',
    'svg',
    'tiff',
    'ico',
    'webp'}

DIR_PATH = os.path.dirname(os.path.realpath(__file__))
FOLDER_PATH = os.path.join(
    DIR_PATH, '../../assets')


def allowed_file(filename, ext):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ext


def create_folder(folder_path):
    if not os.path.exists(folder_path):
        os.makedirs(folder_path)


def allowed_file(filename, extension=None):
    if extension is None:
        return True
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in extension


def remove_file(filename):
    if filename is not None:
        file_path = os.path.join(FOLDER_PATH, filename)
        if os.path.exists(file_path):
            os.remove(file_path)


def upload_media(extension):
    def decorator(function):
        def wrapper(*args, **kwargs):
            request.media = None
            if 'file' not in request.files or not request.files["file"]:
                return function(*args, **kwargs)
            file = request.files['file']

            if allowed_file(file.filename, extension):
                file_extension = secure_filename(file.filename).split('.')[1]
                filename = uuid.uuid4().urn[9:] + '.' + file_extension
                form_data = MultiDict(request.form)
                form_data["original_name"] = file.filename
                form_data["filename"] = filename
                request.media = file
                request.form = form_data
            else:
                return response({"success": False, "code": 400, "message": "file.unAllowedFileType"})

            return function(*args, **kwargs)
        wrapper.__name__ = function.__name__
        return wrapper
    return decorator


def save_file(file, filename):
    if filename and file:
        create_folder(FOLDER_PATH)
        file.save(os.path.join(
            FOLDER_PATH, filename))


def send(filename):
    return send_from_directory(FOLDER_PATH, filename)


def get_file(filename):
    return f'{env["API_URL"]}/api/v1/assets/{filename}'


def parse_file(obj, file_field):
    if file_field in obj:
        obj[file_field] = get_file(obj[file_field])
    return obj
