import datetime

import jwt
from config.env import env


def generate_token(data):
    token_expired_in = 2
    encoded_data = {
        "id": data["id"],
        "username": data["username"],
        "email": data["email"],
        "role": data["role"],
        'exp': datetime.datetime.utcnow() + datetime.timedelta(days=token_expired_in)
    }
    return jwt.encode(encoded_data, env["JWT_SECRET_KEY"], algorithm="HS256")
