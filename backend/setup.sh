python3 -m venv venv     
. venv/bin/activate 
pip install -r requirements.txt
alembic upgrade head
python app/main.py