cd app
gunicorn wsgi:app -c gunicorn_config.py