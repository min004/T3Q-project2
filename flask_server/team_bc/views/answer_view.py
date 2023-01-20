import flask_login
from flask import Blueprint, jsonify
from flask import request
import json
import datetime
from flask_login import login_required

from team_bc.models import question
from team_bc.models.Infomation import Information
from team_bc.models.answer import Answer
from team_bc.models.question import Question

bp = Blueprint('answer', __name__, url_prefix='/comment')


## 댓글 게재
@bp.route("/create/<int:rid>", methods=["POST"])
@login_required
def add_comment(rid):
    """Add a comment and return the comment with ID"""
    dic_data = json.loads(request.data)
    question = Question.query.get_or_404(rid)
    content = dic_data['reply']
    from flask import session
    user_id = session['_user_id']
    information = Information.query.get_or_404(user_id)
    creator = information.name
    KST = datetime.timezone(datetime.timedelta(hours=9))
    answer = Answer(content=content, create_date=str(datetime.datetime.now(KST)), creator=creator, user_id=user_id)
    question.answer_set.append(answer)
    from team_bc import db
    db.session.commit()

    return jsonify()


@bp.route("/<int:rid>")
@login_required
def show_comment(rid):
    question = Question.query.get_or_404(rid)
    result = []
    for ans in question.answer_set:
        ans_dict = ans.to_dict()
        if str(flask_login.current_user.id) == str(ans_dict['user_id']):
            ans_dict['modifiable'] = 'true'
        else:
            ans_dict['modifiable'] = 'false'
        result.append(ans_dict)
    count = len(result)
    return result

@bp.route("/count/<int:rid>")
@login_required
def show_count(rid):
    question = Question.query.get_or_404(rid)
    result = []
    for ans in question.answer_set:
        ans_dict = ans.to_dict()
        if str(flask_login.current_user.id) == str(ans_dict['creator']):
            ans_dict['modifiable'] = 'true'
        else:
            ans_dict['modifiable'] = 'false'
        result.append(ans_dict)
    count = str(len(result))
    return count


@bp.route('/refreshname', methods=['GET'])
def getname():
    user_id = flask_login.current_user.id
    name = Information.query.get(user_id).name
    return name


## 댓글 삭제
@bp.route("/delete/<int:rid>", methods=["POST"])
@login_required
def delete_comment(rid):
    dic_data = json.loads(request.data)
    answer = Answer.query.filter(Answer.question_id == rid).filter(Answer.id == dic_data["id"]).one()
    if str(flask_login.current_user.id) == str(answer.user_id):
        from team_bc import db
        db.session.delete(answer)
        db.session.commit()
        response = jsonify()
    else:
        response = jsonify()
        response.status_code = 401
    return response
