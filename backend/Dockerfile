FROM python:3.10.6
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
EXPOSE 4044
CMD ["sh", "-c","alembic upgrade head; sh start.sh"]
