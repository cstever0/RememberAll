from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Optional
from app.models import Task


class CommentForm(FlaskForm):
    description = StringField("description", validators=[Optional(strip_whitespace=True)])
    user_id = IntegerField("user_id", validators=[DataRequired()])
    task_id = IntegerField("task_id", validators=[DataRequired()])
