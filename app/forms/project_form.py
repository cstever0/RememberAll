from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Optional
from app.models import Project

class ProjectForm(FlaskForm):
    title = StringField("title", validators=[DataRequired()])
    user_id = IntegerField("user_id", validators=[Optional(strip_whitespace=True)])
