from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Optional, Length
from app.models import Label


class LabelForm(FlaskForm):
    title = StringField("title", validators=[DataRequired(), Length(min=1, max=25, message="Please enter a name between 1 and 25 characters.")])
