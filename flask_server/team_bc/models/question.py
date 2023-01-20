from sqlalchemy_serializer import SerializerMixin

from team_bc import db


class Question(db.Model, SerializerMixin):
    __tablename__ = 'question'

    create_date_format = '%s'
    serialize_rules = ('-question.answer.question',)
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.String(200), nullable=False)
    creator = db.Column(db.String(200), nullable=False)
    subject = db.Column(db.String(200), nullable=False)
    content = db.Column(db.Text(), nullable=False)
    create_date = db.Column(db.DateTime(), nullable=False)
    flag = db.Column(db.Boolean, default=True)
