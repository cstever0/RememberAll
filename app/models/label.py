from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Label(db.Model):
    __tablename__ = "labels"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    task_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("tasks.id")))
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())

    user = db.relationship("User", back_populates="user_labels")
    task = db.relationship("Task", back_populates="task_labels")

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "userId": self.user_id,
            "taskId": self.task_id,
            "createdAt": str(self.created_at)
        }
