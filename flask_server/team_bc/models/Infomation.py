from flask_login import UserMixin

from team_bc import db


class Information(db.Model, UserMixin):
    # create columns
    id = db.Column(db.String(40), primary_key=True, nullable=False)
    password = db.Column(db.String(40), nullable=False)
    email = db.Column(db.String(40), unique=True, nullable=False)
    name = db.Column(db.String(40), unique=False, nullable=False)
