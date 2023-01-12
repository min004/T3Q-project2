from flask import render_template, Blueprint, url_for, redirect
from flask import request, jsonify
import json
from flask import Response

from team_bc.models.question import Question

bp = Blueprint('question', __name__, url_prefix='/board')


@bp.route('/list', methods=('GET',))
def _list():
    question_list = Question.query.all()
    result = []
    for i in question_list:
        result.append(i.to_dict())
    result.reverse()
    return result



@bp.route('/create', methods=('POST',))
def create():
    dic_data = json.loads(request.data)
    subject = dic_data["subject"]
    content = dic_data["content"]
    creator = "테스트 유저"
    from datetime import datetime
    q = Question(subject=subject, creator=creator, content=content, create_date=datetime.now())
    from team_bc import db
    db.session.add(q)
    db.session.commit()
    return Response("{'status':'200'}", status=200, mimetype='application/json')

# @bp.route('/modify', methods=('POST',))
# def modify():
#     dic_data = json.loads(request.data)
#     subject = dic_data["subject"]
#     content = dic_data["content"]
#     question_id = dic_data["id"]
#     question = Question.query.get(question_id)
#     question.subject = subject
#     question.content = content

#     from team_bc import db
#     db.session.commit()
#     return Response("{'status':'200'}", status=200, mimetype='application/json')


@bp.route('/delete', methods=('POST',))
def delete():
    dic_data = json.loads(request.data)
    question_id = dic_data["aid"]
    question = Question.query.get(question_id)
    from team_bc import db
    db.session.delete(question)
    db.session.commit()
    return Response("{'status':'200'}", status=200, mimetype='application/json')


@bp.route('/article', methods=['POST'])
def get_article():
    aid = request.get_json()['aid']
    print(aid)
    article = Question.query.get(aid)
    print(article)
    if article:
        success = True
    else:
        success = False
    return article.to_dict()


@bp.route('/article/edit/<aid>', methods=['GET', 'POST'])
def edit_article(aid):
	article = Question.query.get_or_404(aid)
	if request.method == 'POST':
		article.a_title = request.form['a_title']
		article.a_article = request.form['a_article']
		try: 
			db.session.commit()
			response = jsonify({'success':True})
			return response
		except:
			response = jsonify({'success':False})
			return response