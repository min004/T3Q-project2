import json
import psycopg2
from flask import request, jsonify, Blueprint, Response
from team_bc.models.question import Question
from flask_session import Session
from sqlalchemy.exc import IntegrityError
from flask import session
from team_bc.models.Infomation import Information
from psycopg2.errors import UniqueViolation

# from models import Phishing

# 명령어
# flask db init
# flask db migrate
# flask db upgrade


# create a table


# def save(self):
#     db.session.add(self)
#     db.session.commit()
#
# @staticmethod
# def get_all():
#     return Information.query.all()
#
# def repr(self):
#     return f"<Information('{self.id}', '{self.password}, '{self.email}', '{self.name}')>"
#
# # def ():
# #


##################################################################################################################
# server
# @app.route("/")
# def main():
#     return render_template('index.js')


# 1. register -> post, login -> post
bp = Blueprint('api', __name__, url_prefix='/api/phishing/')
@bp.route('/login', methods=['POST'])
def userLogin():
    data = request.get_json()
    user_id = data['id'].strip()
    password = data['pw'].strip()
    info = Information.query.get(user_id)
    if user_id != "" and password != "":
        if info and info.password == password:
            session[user_id] = user_id
            print(session)
            return jsonify({"session_key": user_id})
        else:
            responce = jsonify({"error": "error"})
            responce.status_code = 401
            return responce
    else:
        responce = jsonify()
        responce.status_code = 400
        return responce


@bp.route('/register', methods=['POST'])
def register():
    # --------------------------------- data 들어오는 것인지 or id, pw, email 하나하나 만들어 주어야 하는 것인지
    data = request.get_json()['data']
    id = data['id'].strip()
    password = data['pw'].strip()
    email = data['email'].strip()
    name = data['name'].strip()
    print(session)
    # -------------------------------------------- (1) response (원래 만들었던 server.py 참고하여 작성...?) -> (2) UI 작성
    # ---------------------------------- DataBase 와 연결
    try:
        info = Information(id=id, password=password, email=email, name=name)
        from team_bc import db
        db.session.add(info)
        db.session.commit()
        response = jsonify({
            "status": "success"
        })
    except IntegrityError as e:
        response = jsonify({
            "error": "Bad_Request",
            "detail": e.orig.diag.message_detail,
            "code": 1
        })
        response.status_code = 400

    return response


# ----------------------------------------- route -> post (login)
@bp.route('/database', methods=['GET', 'POST'])
def get_database():
    information_all = Information.get_all()
    results = []

    for info in information_all:
        obj = {
            'url': info.url
        }
        results.append(obj)
    response = jsonify(results)
    response.status_code = 200
    return response


# 데이터베이스 연결
@bp.route('/count', methods=['GET'])
def get_counts():
    information_all = Information.get_all()
    count = len(information_all)
    response = jsonify({
        'count': count
    })
    response.status_code = 200
    return response


@bp.route('/check', methods=['POST'])
def check():
    data = request.get_json()
    user_id = data['user_id']
    try:
        if data['session_key'] != session[user_id]:
            response = jsonify()
            response.status_code = 400

        else:
            response = jsonify()

    except KeyError:
        response = jsonify()
        response.status_code = 400
    return response


@bp.route('/create', methods=('POST',))
def create():
    
    dic_data = json.loads(request.data)
    # print(dic_data)
    subject = dic_data["subject"]
    content = dic_data["content"]
    from datetime import datetime
    q = Question(subject=subject, content=content, create_date=datetime.now())
    from team_bc import db
    db.session.add(q)
    db.session.commit()
    return Response("{'status':'200'}", status=200, mimetype='application/json')