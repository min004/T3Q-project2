import flask_login
import psycopg2
from flask import request, jsonify, Blueprint, Response
from flask_login import login_user, login_required, logout_user
from flask_session import Session
from sqlalchemy.exc import IntegrityError
from flask import session

from team_bc import login_manager
from team_bc.models.Infomation import Information
from psycopg2.errors import UniqueViolation

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


bp = Blueprint('api', __name__, url_prefix='/api/')


@login_manager.user_loader
def load_user(user_id):
    return Information.query.get(user_id)


@bp.route('/login', methods=['POST'])
def userLogin():
    data = request.get_json()
    user_id = data['id'].strip()
    password = data['pw'].strip()
    info = Information.query.get(user_id)
    if user_id != "" and password != "":
        if info and info.password == password:
            login_user(info)
            return jsonify()
        else:
            responce = jsonify({"error": "error"})
            responce.status_code = 401
            return responce
    else:
        responce = jsonify()
        responce.status_code = 400
        return responce

@bp.route('/getusername', methods=['POST'])
def getname():
    data = request.get_json()
    user_id = data['id'].strip()
    password = data['pw'].strip()
    info = Information.query.get(user_id)
    if user_id != "" and password != "":
        if info and info.password == password:
            res = Information.query.get(user_id).name
            return res



@bp.route('/register', methods=['POST'])
def register():
    # --------------------------------- data 들어오는 것인지 or id, pw, email 하나하나 만들어 주어야 하는 것인지
    data = request.get_json()['data']
    id = data['id'].strip()
    password = data['pw'].strip()
    email = data['email'].strip()
    name = data['name'].strip()
    # -------------------------------------------- (1) response (원래 만들었던 server.py 참고하여 작성...?) -> (2) UI 작성
    # ---------------------------------- DataBase 와 연결
    try:
        if id == "" or password == "" or email == "" or name == "":
            raise ValueError
        info = Information(id=id, password=password, email=email, name=name)
        from team_bc import db
        db.session.add(info)
        db.session.commit()
        response = jsonify({
            "status": "success"
        })
    except IntegrityError:
        response = jsonify()
        response.status_code = 400
    except ValueError:
        response = jsonify()
        response.status_code = 403

    return response


@bp.route('/logout')
@login_required
def logout():
    logout_user()
    return jsonify("로그아웃 성공")
