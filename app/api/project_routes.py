from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Task, Comment, Project
from app.forms import TaskForm, ProjectForm


project_routes = Blueprint('projects', __name__)


@project_routes.route("/", methods=["GET", "POST"])
@login_required
def get_current_projects():
    """
    Query for all projects that belong to the current_user and returns them in a list
    or add a new project
    """

    if request.method == "GET":
        projects = Project.query.filter(Project.user_id == current_user.id).all()
        response = [project.to_dict() for project in projects]
        return { "projects": response }, 200

    if request.method == "POST":
        form = ProjectForm()
        form['csrf_token'].data = request.cookies['csrf_token']

        if form.validate_on_submit():
            data = form.data
            new_project = Project(
                title = data["title"],
                user_id = current_user.id
            )

            db.session.add(new_project)
            db.session.commit()
            return new_project.to_dict(), 201

        else:
            return form.errors, 400


@project_routes.route("/<int:id>", methods=["GET", "PUT", "DELETE"])
@login_required
def get_one_project(id):
    """
    Query for a specific project and returns that project as a dictionary
    """

    project = Project.query.get(id)

    if not project:
        return { "errors": "We're sorry, that project cannot be found"}, 404

    if request.method == "GET":
        response = project.to_dict()
        return { "project": response }

    if request.method == "PUT":
        if project.user_id == current_user.id:
            form = ProjectForm()
            form['csrf_token'].data = request.cookies['csrf_token']

            if form.validate_on_submit():
                data = form.data
                project.title = data["title"]
                project.user_id = current_user.id

                db.session.commit()
                return project.to_dict(), 202

            else:
                print(form.errors)
                return form.errors, 400

        else:
            return { "errors": "Unauthorized user" }, 401

    if request.method == "DELETE":
        if project.user_id == current_user.id:
            db.session.delete(project)
            db.session.commit()
            return { "message": "Successfully Deleted" }

        else:
            return { "errors": "Unauthorized user" }, 401
