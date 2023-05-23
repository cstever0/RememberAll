from app.models import db, Task, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime


def seed_tasks():
    task1 = Task(
        title='Database Migrated', description='Migrate database', user_id=1, project_id=1, due_date=datetime.now())
    task2 = Task(
        title='Seed Data Created', description='Create seed data', user_id=1, project_id=1, due_date=datetime.now())
    task3 = Task(
        title='Deployed to Render', description='Deploy to render', user_id=1, project_id=3, due_date=datetime.now())
    task4 = Task(
        title='Database Migrated', description='Migrate database', user_id=2, project_id=4, due_date=datetime.now())
    task5 = Task(
        title='Seed Data Created', description='Create seed data', user_id=2, project_id=5, due_date=datetime.now())
    task6 = Task(
        title='Deployed to Render', description='Deploy to render', user_id=2, project_id=6, due_date=datetime.now())
    task7 = Task(
        title='Database Migrated', description='Migrate database', user_id=3, project_id=7, due_date=datetime.now())
    task8 = Task(
        title='Seed Data Created', description='Create seed data', user_id=3, project_id=8, due_date=datetime.now())
    task9 = Task(
        title='Deployed to Render', description='Deploy to render', user_id=3, project_id=9, due_date=datetime.now())


    db.session.add(task1)
    db.session.add(task2)
    db.session.add(task3)
    db.session.add(task4)
    db.session.add(task5)
    db.session.add(task6)
    db.session.add(task7)
    db.session.add(task8)
    db.session.add(task9)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the tasks table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_tasks():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.tasks RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM tasks"))

    db.session.commit()
