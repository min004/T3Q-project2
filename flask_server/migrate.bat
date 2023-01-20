set FLASK_APP=team_bc/__init__.py
set FLASK_ENV=development
@REM python -m flask db init
python -m flask db migrate
python -m flask db upgrade
