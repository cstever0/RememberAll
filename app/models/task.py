from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Task(db.Model):
    __tablename__ = "tasks"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(255))
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    project_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("projects.id")))
    label_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("labels.id")))
    due_date = db.Column(db.DateTime)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())

    user = db.relationship("User", back_populates="user_tasks")
    project = db.relationship("Project", back_populates="project_tasks")
    label = db.relationship("Label", back_populates="label_tasks")
    task_comments = db.relationship("Comment", back_populates="task", cascade="all, delete-orphan")

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "userId": self.user_id,
            "projectId": self.project_id,
            "labelId": self.label_id,
            "dueDate": str(self.due_date),
            "createdAt": str(self.created_at),
            # "labels": [label.to_dict() for label in self.labels]
        }
