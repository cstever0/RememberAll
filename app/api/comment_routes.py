from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Task, Comment, Project
from app.forms import CommentForm

comment_routes = Blueprint('comments', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@comment_routes.route("/", methods=["GET", "POST"])
@login_required
def get_current_comments():
    """
    Query for all comments that belong to the current_user or Post a comment to a task created by the current_user
    """

    if request.method == "GET":
        comments = Comment.query.filter(Comment.user_id == current_user.id).all()
        response = [comment.to_dict() for comment in comments]
        return { "comments": response }

    if request.method == "POST":
        form = CommentForm()
        form['csrf_token'].data = request.cookies['csrf_token']

        if form.validate_on_submit():
            data = form.data
            new_comment = Comment(
                description = data["description"],
                user_id = current_user.id,
                task_id = data["task_id"]
            )

            db.session.add(new_comment)
            db.session.commit()
            return new_comment.to_dict(), 201

        else:
            return { "errors": validation_errors_to_error_messages(form.errors) }, 400


@comment_routes.route("/<int:id>", methods=["GET", "PUT", "DELETE"])
@login_required
def edit_comment(id):
    """
    Edit a comment or delete a comment created by the current_user
    """

    comment = Comment.query.get(id)

    if not comment:
        return { "error": "We're sorry, that comment cannot be found"}, 404

    if request.method == "GET":
        response = comment.to_dict()
        return { "comment": response }

    if request.method == "PUT":
        if comment.user_id == current_user.id:
            form = CommentForm()
            form['csrf_token'].data = request.cookies['csrf_token']

            if form.validate_on_submit():
                data = form.data
                comment.description = data["description"]

                db.session.commit()
                return comment.to_dict(), 202

            else:
                return { "errors": validation_errors_to_error_messages(form.errors) }, 400

        else:
            return { "errors": "Unauthorized user" }, 401

    if request.method == "DELETE":
        if comment.user_id == current_user.id:
            db.session.delete(comment)
            db.session.commit()
            return { "message": "Successfully Deleted"}

        else:
            return { "errors": "Unauthorized user" }, 401
