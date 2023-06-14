from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Label
from app.forms import LabelForm

label_routes = Blueprint('labels', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@label_routes.route("/", methods=["GET", "POST"])
@login_required
def get_current_labels():
    """
    Query for all labels that belong to the current_user or Post a label for the current_user
    """

    if request.method == "GET":
        labels = Label.query.filter(Label.user_id == current_user.id).all()
        response = [label.to_dict() for label in labels]
        return { "labels": response }

    if request.method == "POST":
        form = LabelForm()
        form['csrf_token'].data = request.cookies['csrf_token']

        if form.validate_on_submit():
            data = form.data
            new_label = Label(
                title = data["title"],
                user_id = current_user.id,
                task_id = data["task_id"]
            )

            db.session.add(new_label)
            db.session.commit()
            return new_label.to_dict(), 201

        else:
            return { "errors": validation_errors_to_error_messages(form.errors) }, 400


@label_routes.route("/<int:id>", methods=["GET", "PUT", "DELETE"])
@login_required
def edit_label(id):
    """
    Edit a label or delete a label created by the current_user
    """

    label = Label.query.get(id)

    if not label:
        return { "error": "We're sorry, that label cannot be found" }, 404

    if request.method == "GET":
        response = label.to_dict()
        return { "label": response }

    if request.method == "PUT":
        if label.user_id == current_user.id:
            form = LabelForm()
            form['csrf_token'].data = request.cookies['csrf_token']

            if form.validate_on_submit():
                data = form.data
                label.title = data["title"]

                db.session.commit()
                return label.to_dict(), 201

            else:
                return { "errors": validation_errors_to_error_messages(form.errors) }, 400

        else:
            return { "errors": "Unauthorized User" }, 401

    if request.method == "DELETE":
        if label.user_id == current_user.id:
            db.session.delete(label)
            db.session.commit()
            return { "message": "Successfully Deleted" }

        else:
            return { "errors": "Unauthorized User" }, 401
