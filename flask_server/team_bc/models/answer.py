from sqlalchemy_serializer import SerializerMixin

from team_bc import db


class Answer(db.Model, SerializerMixin):
    __tablename__ = 'answer'

    create_date_format = '%s'
    serialize_only = ('id', 'creator', 'content', 'create_date', 'user_id')
    serialize_rules = ('-answer.question.answer',)
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.String(200), nullable=False)
    creator = db.Column(db.String(200), nullable=False)
    question_id = db.Column(db.Integer, db.ForeignKey('question.id', ondelete='CASCADE'))
    question = db.relationship('Question', backref=db.backref('answer_set'))
    content = db.Column(db.Text(), nullable=False)
    create_date = db.Column(db.DateTime(), nullable=False)
    flag = db.Column(db.Boolean, default=True)
