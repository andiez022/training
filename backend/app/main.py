import models
from config.database import SessionLocal, engine
from flask import Flask, jsonify
from sqlalchemy.orm import scoped_session
from routes.user import user_bp
from routes.notice import notice_bp
from routes.content import content_bp
from routes.living_lab import living_lab_bp
from routes.campaign import campaign_bp
from routes.free_board import free_board_bp
from common.file import send
from config.env import env
from flask_cors import CORS
from common.auth import authentication
from common.file import IMAGE_EXTENSION, upload_media, get_file, save_file
from flask import request
from common.response import response

models.Base.metadata.create_all(bind=engine)

app = Flask(__name__)
app.db = scoped_session(SessionLocal)

CORS(app)


@app.errorhandler(404)
def resource_not_found(exception):
    """Returns exceptions as part of a json."""
    return jsonify(error=str(exception)), 404


@app.get('/api/v1/assets/<path:filename>')
def serve_asset(filename):
    return send(filename)


@app.post('/api/v1/assets')
@upload_media(IMAGE_EXTENSION)
def save_assets():
    data = request.form
    if data["filename"] is None:
        return response({"code": 400, "success": False, "message": "file.notFound"})

    save_file(request.media, data["filename"])
    return response({"data": {
        "filename": data["filename"],
        "url": get_file(data["filename"]),
        "original_name": data["original_name"]
    }})


@app.route('/api/v1/health-check')
def health_check():
    return "Running!"


app.register_blueprint(user_bp)
app.register_blueprint(notice_bp)
app.register_blueprint(content_bp)
app.register_blueprint(living_lab_bp)
app.register_blueprint(campaign_bp)
app.register_blueprint(free_board_bp)


@app.teardown_appcontext
def remove_session(*args, **kwargs):  # pylint: disable=unused-argument
    """Closes the database session."""
    app.db.remove()


if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=env["PORT"])
