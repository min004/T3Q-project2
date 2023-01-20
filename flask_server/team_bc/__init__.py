from flask import Flask
from flask_cors import CORS
from flask_login import LoginManager
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from team_bc import config

db = SQLAlchemy()
migrate = Migrate()
login_manager = LoginManager()



def create_app():
    app = Flask(__name__)
    app.config.from_object(config)

    db.init_app(app)
    login_manager.init_app(app)

    from team_bc.models.Infomation import Information
    @login_manager.user_loader
    def load_user(user_id):
        return Information.query.get(user_id)

    with app.app_context():
        migrate.init_app(app, db)
        CORS(app, supports_credentials=True)
        from team_bc.views import api
        from team_bc.views import question_view
        from team_bc.views import answer_view
        app.register_blueprint(api.bp)
        app.register_blueprint(question_view.bp)
        app.register_blueprint(answer_view.bp)
    return app
