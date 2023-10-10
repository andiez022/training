import os

from dotenv import load_dotenv

load_dotenv()

env = {
    "POSTGRES_USER": os.environ["POSTGRES_USER"],
    "POSTGRES_PASSWORD": os.environ["POSTGRES_PASSWORD"],
    "POSTGRES_DB": os.environ["POSTGRES_DB"],
    "POSTGRES_HOST": os.environ["POSTGRES_HOST"],
    "POSTGRES_PORT": os.environ["POSTGRES_PORT"],
    "JWT_SECRET_KEY": os.environ["JWT_SECRET_KEY"],
    "PORT": os.environ["PORT"],
    "API_URL": os.environ["API_URL"],
}
