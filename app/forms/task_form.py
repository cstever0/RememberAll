from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateTimeLocalField, DateField, DateTimeField, SelectField
from wtforms.validators import DataRequired, Optional
from app.models import Task


class TaskForm(FlaskForm):
    title = StringField("title", validators=[DataRequired()])
    description = StringField("description", validators=[Optional(strip_whitespace=True)])
    project_id = SelectField("project_id", coerce=int, validate_choice=False, choices=[], validators=[Optional(strip_whitespace=True)])
    # due_date = DateTimeLocalField("due_date", format="%Y-%m-%dT%H:%M")
    due_date = DateField("due_date", validators=[DataRequired()])
    # project_name = SelectField("project_name", choices=[])
