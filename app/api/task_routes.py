from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Task, Comment
from app.forms import TaskForm

task_routes = Blueprint('tasks', __name__)


def get_task_comments(id):
    """
    Helper function to retrieve all comments for a single task
    """

    comments = Comment.query.filter(Comment.task_id == id).all()
    response = [comment.to_dict() for comment in comments]
    return { "comments": response }



@task_routes.route('/', methods=["GET", "POST"])
@login_required
def get_current_tasks():
    """
    Query for all tasks that belong to the current_user and returns them in a list of task dictionaries
    or add a new task
    """

    if request.method == "GET":
        tasks = Task.query.filter(Task.user_id == current_user.id).all()
        response = [task.to_dict() for task in tasks]
        return { "tasks": response }, 200

    if request.method == "POST":
        form = TaskForm()
        form['csrf_token'].data = request.cookies['csrf_token']

        if form.validate_on_submit():
            data = form.data
            new_task = Task(
                title = data["title"],
                description = data["description"],
                user_id = current_user.id,
                project_id = data["project_id"],
                due_date = data["due_date"]
            )

            db.session.add(new_task)
            db.session.commit()
            return new_task.to_dict(), 201

        else:
            return form.errors, 400



@task_routes.route('/<int:id>', methods=["GET", "PUT", "DELETE"])
@login_required
def get_one_task(id):
    """
    Query for a specific task and returns that task as a dictionary
    """

    task = Task.query.get(id)

    if not task:
        return { "error": "We're sorry, that task cannot be found"}, 404

    if request.method == "GET":
        response = task.to_dict()
        response["comments"] = get_task_comments(task.id)
        return { "task": response }

    if request.method == "PUT":
        if task.user_id == current_user.id:
            form = TaskForm()
            form['csrf_token'].data = request.cookies['csrf_token']

            if form.validate_on_submit():
                data = form.data
                task.title = data["title"]
                task.description = data["description"]
                task.user_id = current_user
                task.project_id = data["project_id"]
                task.due_date = data["due_date"]

                db.session.commit()
                return task.to_dict(), 202

            else:
                return form.errors, 400

        else:
            return { "errors": "Unauthorized user" }, 401

    if request.method == "DELETE":
        pass