from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Optional, Length
from app.models import Task


class CommentForm(FlaskForm):
    description = StringField("description", validators=[DataRequired(), Length(min=2, max=250, message="Please enter a comment between 2 and 250 characters")])
    # user_id = IntegerField("user_id", validators=[DataRequired()])
    task_id = IntegerField("task_id", validators=[DataRequired()])
