from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Task, Comment

task_routes = Blueprint('tasks', __name__)


def get_task_comments(id):
    """
    Helper function to retrieve all comments for a single task
    """

    comments = Comment.query.filter(Comment.task_id == id).all()
    response = [comment.to_dict() for comment in comments]
    return { "comments": response }



@task_routes.route('/')
@login_required
def get_current_tasks():
    """
    Query for all tasks that belong to the current_user and returns them in a list of task dictionaries
    """

    tasks = Task.query.filter(Task.user_id == current_user.id).all()
    response = [task.to_dict() for task in tasks]
    return { "tasks": response }


@task_routes.route('/<int:id>', methods=["GET", "PUT", "DELETE"])
@login_required
def get_one_task(id):
    """
    Query for a specific task and returns that task as a dictionary
    """

    task = Task.query.get(id)

    if not task:
        return { "error": "We're sorry, that task cannot be found"}

    if request.method == "GET":
        response = task.to_dict()
        response["comments"] = get_task_comments(task.id)
        return { "task": response }

    if request.method == "PUT":
        if task.user_id != current_user.id:
            return { "error": "Unauthorized request" }, 401
