from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateTimeLocalField
from wtforms.validators import DataRequired, Optional
from app.models import Task


class TaskForm(FlaskForm):
    title = StringField("title", validators=[DataRequired()])
    description = StringField("description", validators=[Optional(strip_whitespace=True)])
    project_id = IntegerField("project_id", validators=[Optional(strip_whitespace=True)])
    due_date = DateTimeLocalField("due_date")
