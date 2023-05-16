from app.models import db, Comment, environment, SCHEMA
from sqlalchemy.sql import text


# you can add other comments here if you want
def seed_comments():
    comment1 = Comment(
        description='Successfully completed first migration. May need to update models.', user_id=1, task_id=1)
    comment2 = Comment(
        description='Not sure if I have created enough seed data.', user_id=1, task_id=2)
    comment3 = Comment(
        description='Still testing live site for bugs.', user_id=1, task_id=3)
    comment4 = Comment(
        description='Successfully completed first migration. May need to update models.', user_id=2, task_id=4)
    comment5 = Comment(
        description='Not sure if I have created enough seed data.', user_id=2, task_id=5)
    comment6 = Comment(
        description='Still testing live site for bugs.', user_id=2, task_id=6)
    comment7 = Comment(
        description='Successfully completed first migration. May need to update models.', user_id=3, task_id=7)
    comment8 = Comment(
        description='Not sure if I have created enough seed data.', user_id=3, task_id=8)
    comment9 = Comment(
        description='Still testing live site for bugs.', user_id=3, task_id=9)

    db.session.add(comment1)
    db.session.add(comment2)
    db.session.add(comment3)
    db.session.add(comment4)
    db.session.add(comment5)
    db.session.add(comment6)
    db.session.add(comment7)
    db.session.add(comment8)
    db.session.add(comment9)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the comments table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM comments"))

    db.session.commit()
